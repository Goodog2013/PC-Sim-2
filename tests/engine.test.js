import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateBuild, candidateStatus, estimateBenchmark, getInstallBlockers, validateBoot, installationOrder } from '../src/engine.js';
import { categories, products, productById, presets } from '../src/catalog.js';

const component = (category, data) => ({ id: category, category, name: category, price: 1000, ...data });
function buildFixture() {
  return {
    case: component('case', { supportedFormFactors: ['ATX', 'mATX', 'Mini-ITX'], maxGpuLength: 360, maxCoolerHeight: 170, maxPsuLength: 200, radiatorSupport: [120, 240, 360] }),
    motherboard: component('motherboard', { socket: 'AM5', memoryType: 'DDR5', formFactor: 'ATX', memorySlots: 4, maxMemory: 128, m2Slots: 3 }),
    cpu: component('cpu', { socket: 'AM5', memoryTypes: ['DDR5'], tdp: 105, peakPower: 140, score: 100, hasIntegratedGraphics: true }),
    ram: component('ram', { memoryType: 'DDR5', capacity: 32, modules: 2, speed: 6000 }),
    storage: component('storage', { capacity: 1000, interface: 'NVMe', power: 7 }),
    gpu: component('gpu', { length: 310, vram: 12, power: 220, score: 100, recommendedPsu: 650, powerConnector: '12VHPWR' }),
    cooler: component('cooler', { sockets: ['AM5', 'LGA1700'], kind: 'air', height: 160, coolingCapacity: 240 }),
    psu: component('psu', { watts: 750, length: 160, formFactor: 'ATX', connectors: ['12VHPWR', '2× EPS 8-pin'] }),
  };
}

test('a complete compatible build has additive pricing and sane power headroom', () => {
  const result = evaluateBuild(buildFixture());
  assert.equal(result.complete, true);
  assert.equal(result.compatible, true);
  assert.equal(result.totalPrice, 8000);
  assert.equal(result.power.estimated, 427);
  assert.equal(result.power.recommended, 650);
  assert.equal(result.power.headroom, 323);
  assert.equal(result.power.loadPercent, 57);
  assert.equal(result.errors.length, 0);
});

test('an empty build is incomplete, has no fabricated compatibility errors or power draw', () => {
  const result = evaluateBuild({});
  assert.equal(result.complete, false);
  assert.equal(result.compatible, true);
  assert.equal(result.bootableConfiguration, false);
  assert.equal(result.totalPrice, 0);
  assert.equal(result.power.estimated, 0);
  assert.equal(result.power.recommended, 0);
  assert.equal(result.missing.length, 8);
  assert.equal(validateBoot({}).canBoot, false);
});

test('socket and DDR generation mismatches are explicit errors', () => {
  const build = buildFixture();
  build.cpu = { ...build.cpu, socket: 'LGA1700' };
  build.ram = { ...build.ram, memoryType: 'DDR4' };
  const result = evaluateBuild(build);
  assert.equal(result.compatible, false);
  assert.ok(result.errors.some(item => item.id === 'cpu-socket'));
  assert.ok(result.errors.some(item => item.id === 'memory-generation'));
  assert.ok(result.errors.some(item => item.id === 'cpu-memory'));
});

test('case fit checks motherboard, GPU, air cooler, PSU and AIO radiator independently', () => {
  const build = buildFixture();
  build.case = { ...build.case, supportedFormFactors: ['Mini-ITX'], maxGpuLength: 290, maxCoolerHeight: 150, maxPsuLength: 140 };
  const result = evaluateBuild(build);
  for (const id of ['board-form-factor', 'gpu-length', 'cooler-height', 'psu-length']) {
    assert.ok(result.errors.some(item => item.id === id), id);
  }
  build.cooler = { ...build.cooler, kind: 'aio', radiator: 280 };
  assert.ok(evaluateBuild(build).errors.some(item => item.id === 'radiator-size'));
  assert.ok(!evaluateBuild(build).errors.some(item => item.id === 'cooler-height'));
});

test('DIMM slot and memory capacity limits cannot be exceeded', () => {
  const build = buildFixture();
  build.ram = { ...build.ram, capacity: 256, modules: 8 };
  const result = evaluateBuild(build);
  assert.ok(result.errors.some(item => item.id === 'memory-slots'));
  assert.ok(result.errors.some(item => item.id === 'memory-capacity'));
});

test('insufficient PSU is blocking, while small headroom is a recommendation', () => {
  const build = buildFixture();
  build.psu.watts = 400;
  assert.ok(evaluateBuild(build).errors.some(item => item.id === 'psu-overload'));
  assert.equal(validateBoot(build, { thermalPaste: true, cablesConnected: true }).canBoot, false);
  build.psu.watts = 550;
  assert.equal(evaluateBuild(build).compatible, true);
  assert.ok(evaluateBuild(build).warnings.some(item => item.id === 'psu-headroom'));
});

test('candidate filtering ignores unrelated conflicts but sees problems caused by replacement', () => {
  const build = buildFixture();
  build.gpu.length = 500;
  assert.equal(candidateStatus(build, build.ram).compatible, true);
  assert.equal(candidateStatus(build, { ...build.ram, memoryType: 'DDR4' }).compatible, false);
  assert.equal(candidateStatus(build, build.case).compatible, false);
});

test('assembly enforces physical prerequisites', () => {
  const build = buildFixture();
  assert.ok(getInstallBlockers('cpu', build, ['case']).some(message => message.includes('материнская')));
  assert.deepEqual(getInstallBlockers('cpu', build, ['case', 'motherboard']), []);
  assert.ok(getInstallBlockers('cooler', build, ['case', 'motherboard']).length > 0);
  assert.deepEqual(getInstallBlockers('case', build, []), []);
});

test('POST requires installation, wiring and thermal paste, then passes', () => {
  const build = buildFixture();
  assert.equal(validateBoot(build, { installed: installationOrder, thermalPaste: false, cablesConnected: true }).canBoot, false);
  assert.equal(validateBoot(build, { installed: installationOrder, thermalPaste: true, cablesConnected: false }).canBoot, false);
  assert.equal(validateBoot(build, { installed: ['case', 'motherboard', 'cpu'], thermalPaste: true, cablesConnected: true }).canBoot, false);
  const result = validateBoot(build, { installed: installationOrder, thermalPaste: true, cablesConnected: true });
  assert.equal(result.canBoot, true);
  assert.ok(result.steps.every(step => step.status === 'pass'));
});

test('integrated graphics allows boot without discrete GPU; F-style CPU cannot', () => {
  const build = buildFixture();
  delete build.gpu;
  assert.equal(evaluateBuild(build).complete, false);
  assert.equal(evaluateBuild(build).bootableConfiguration, true);
  assert.equal(validateBoot(build, { thermalPaste: true, cablesConnected: true }).canBoot, true);
  build.cpu.hasIntegratedGraphics = false;
  assert.equal(validateBoot(build, { thermalPaste: true, cablesConnected: true }).canBoot, false);
  assert.ok(evaluateBuild(build).warnings.some(item => item.id === 'no-display-output'));
});

test('a selected but uninstalled GPU cannot provide display output', () => {
  const build = buildFixture();
  build.cpu.hasIntegratedGraphics = false;
  const result = validateBoot(build, { installed: installationOrder.filter(id => id !== 'gpu'), thermalPaste: true, cablesConnected: true });
  assert.equal(result.canBoot, false);
  assert.equal(result.steps.find(step => step.id === 'graphics').status, 'fail');
});

test('synthetic FPS responds to resolution and weaker GPU, never claims measurement', () => {
  const build = buildFixture();
  const lowResolution = estimateBenchmark(build, { resolution: '1080p', game: 'cyberpunk' });
  const highResolution = estimateBenchmark(build, { resolution: '4k', game: 'cyberpunk' });
  assert.ok(lowResolution.fps > highResolution.fps);
  assert.ok(highResolution.low1 < highResolution.fps);
  assert.equal(highResolution.simulated, true);
  build.gpu.score = 50;
  assert.ok(estimateBenchmark(build, { resolution: '1080p', game: 'cyberpunk' }).fps < lowResolution.fps);
  assert.equal(estimateBenchmark({}).available, false);
});

test('known incompatible builds cannot produce simulated FPS', () => {
  const build = buildFixture();
  build.cpu.socket = 'LGA1700';
  assert.equal(estimateBenchmark(build).available, false);
});

test('catalog aliases Micro-ATX and mATX are treated as the same form factor', () => {
  const build = buildFixture();
  build.motherboard.formFactor = 'Micro-ATX';
  assert.ok(!evaluateBuild(build).errors.some(item => item.id === 'board-form-factor'));
});

test('compact cases account for shorter GPU clearance with ATX power supplies', () => {
  const build = buildFixture();
  build.case.maxGpuLengthWithAtxPsu = 230;
  assert.ok(evaluateBuild(build).errors.some(item => item.id === 'gpu-length'));
  assert.equal(candidateStatus(build, build.psu).compatible, false);
  build.psu.formFactor = 'SFX';
  assert.ok(!evaluateBuild(build).errors.some(item => item.id === 'gpu-length'));
});

test('front-only radiator mounting uses the reduced GPU clearance', () => {
  const build = buildFixture();
  build.cooler = { ...build.cooler, kind: 'aio', radiator: 360 };
  build.case.maxGpuLengthWithFrontRadiator = 300;
  build.case.frontRadiatorOnly = [360];
  assert.ok(evaluateBuild(build).errors.some(item => item.id === 'front-radiator-gpu-length'));
  build.cooler.radiator = 240;
  assert.ok(!evaluateBuild(build).errors.some(item => item.id === 'front-radiator-gpu-length'));
});

test('native cable flag and count of PCIe connectors are evaluated by value', () => {
  const build = buildFixture();
  build.psu.connectors = { pcie8: 2, eps8: 2, native12VHPWR: false };
  assert.ok(evaluateBuild(build).warnings.some(item => item.id === 'gpu-power-adapter'));
  build.psu.connectors.native12VHPWR = true;
  assert.ok(!evaluateBuild(build).warnings.some(item => item.id === 'gpu-power-adapter'));
  build.gpu.powerConnector = '3×8-pin';
  assert.ok(evaluateBuild(build).errors.some(item => item.id === 'gpu-power-connectors'));
});

test('tall RAM can require raising a cooler fan beyond the case clearance', () => {
  const build = buildFixture();
  build.ram.height = 40;
  build.cooler.maxRamHeight = 32;
  build.cooler.height = 165;
  const result = evaluateBuild(build);
  assert.ok(result.errors.some(item => item.id === 'cooler-height' && item.categories.includes('ram')));
  assert.equal(candidateStatus(build, build.ram).compatible, false);
  build.case.maxCoolerHeight = 180;
  assert.ok(evaluateBuild(build).warnings.some(item => item.id === 'cooler-ram-clearance'));
});

test('16-pin GPU adapters require enough PCIe8 source connectors', () => {
  const build = buildFixture();
  build.gpu.adapterPcie8 = 3;
  build.psu.connectors = { pcie8: 2, eps8: 1, native12VHPWR: false };
  assert.ok(evaluateBuild(build).errors.some(item => item.id === 'gpu-adapter-connectors'));
  build.psu.connectors.pcie8 = 3;
  assert.ok(!evaluateBuild(build).errors.some(item => item.id === 'gpu-adapter-connectors'));
  build.psu.connectors = { pcie8: 0, eps8: 1, native12VHPWR: true };
  assert.ok(!evaluateBuild(build).errors.some(item => item.id === 'gpu-adapter-connectors'));
});

test('catalog product identities and category coverage remain valid for saves and imports', () => {
  const ids = products.map(product => product.id);
  assert.equal(new Set(ids).size, ids.length, 'Product IDs must be unique');
  assert.deepEqual(new Set(categories.map(category => category.id)), new Set(installationOrder));
  for (const product of products) {
    assert.ok(installationOrder.includes(product.category), product.id);
    assert.equal(productById[product.id], product);
    assert.ok(Number.isFinite(product.price) && product.price > 0, product.id);
    assert.equal(new URL(product.sourceUrl).protocol, 'https:', product.id);
    assert.ok(Array.isArray(product.specs) && product.specs.length > 0, product.id);
  }
  for (const category of installationOrder) {
    assert.ok(products.filter(product => product.category === category).length >= 2, `${category} must offer choices`);
  }
});

for (const preset of presets) {
  test(`catalog preset ${preset.id} references matching categories and completes POST`, () => {
    assert.deepEqual(new Set(Object.keys(preset.build)), new Set(installationOrder));
    const build = Object.fromEntries(Object.entries(preset.build).map(([category, id]) => {
      assert.ok(productById[id], `${preset.id}: unknown product ${id}`);
      assert.equal(productById[id].category, category, `${preset.id}: wrong category for ${id}`);
      return [category, productById[id]];
    }));
    const result = evaluateBuild(build);
    assert.equal(result.complete, true);
    assert.equal(result.compatible, true, JSON.stringify(result.errors));
    assert.equal(validateBoot(build, { installed: installationOrder, thermalPaste: true, cablesConnected: true }).canBoot, true);
    assert.equal(estimateBenchmark(build).available, true);
  });
}

test('expanded catalog retains source provenance and declares partial specifications', () => {
  for (const product of products) {
    assert.match(product.sourceCheckedAt, /^\d{4}-\d{2}-\d{2}$/, product.id);
    assert.match(product.sourceVerification, /^manufacturer-/, product.id);
    if (product.sourceVerification.endsWith('-partial')) {
      assert.ok(Array.isArray(product.unknownSpecs) && product.unknownSpecs.length > 0, `${product.id}: partial source must identify unknown specifications`);
    }
    if (product.category === 'ram' && product.sourceVerification === 'manufacturer-datasheet') {
      assert.ok(product.sku, `${product.id}: exact datasheet must retain the part number`);
      assert.ok(product.capacity % product.modules === 0, `${product.id}: capacity must match the kit`);
    }
  }
});

test('verified original AM5 boards support added Ryzen 8000 and 9000 families', () => {
  for (const cpuId of ['ryzen-8700g', 'ryzen-9800x3d']) {
    for (const boardId of ['b650-gaming-plus', 'b650m-a']) {
      const result = evaluateBuild({ cpu: productById[cpuId], motherboard: productById[boardId] });
      assert.ok(productById[cpuId] && productById[boardId]);
      assert.equal(result.compatible, true, `${cpuId} + ${boardId}`);
    }
  }
});
