import test from 'node:test';
import assert from 'node:assert/strict';
import { customCategoryIds, customDefaults, normalizeCustomProduct, normalizeCustomBatch } from '../src/custom-components.js';
import { evaluateBuild, validateBoot } from '../src/engine.js';

function draft(category, changes = {}) {
  return { ...customDefaults(category), name: `Goodog ${category} One`, id: `custom-${category}-000001`, ...changes };
}

for (const category of customCategoryIds) {
  test(`custom ${category} survives catalog, editor and JSON roundtrips`, () => {
    const component = normalizeCustomProduct(draft(category));
    assert.equal(component.id, `custom-${category}-000001`);
    assert.equal(component.category, category);
    assert.equal(component.custom, true);
    assert.equal(component.sourceVerification, 'user-defined');
    assert.equal(component.brand, 'Goodog Labs');
    assert.ok(Array.isArray(component.specs) && component.specs.length > 0);
    assert.ok(component.specs.every(spec => typeof spec === 'string' && !/undefined|NaN/.test(spec)));
    assert.deepEqual(normalizeCustomProduct(JSON.parse(JSON.stringify(component))), component);
    assert.deepEqual(normalizeCustomProduct(customDefaults(category, component)), component);
  });
}

test('a complete eight-category custom build participates in compatibility and POST', () => {
  const build = Object.fromEntries(customCategoryIds.map(category => [category, normalizeCustomProduct(draft(category))]));
  const result = evaluateBuild(build);
  assert.equal(result.complete, true);
  assert.equal(result.compatible, true, JSON.stringify(result.errors));
  assert.equal(result.totalPrice, 80000);
  assert.equal(validateBoot(build, { thermalPaste: true, cablesConnected: true }).canBoot, true);
});

test('AIO and air products ignore inactive dimensions and survive normalized roundtrips', () => {
  const aio = normalizeCustomProduct(draft('cooler', { kind: 'aio', height: null, radiator: '360' }));
  assert.equal(aio.height, null);
  assert.equal(aio.radiator, 360);
  assert.match(aio.specs[0], /СЖО 360 мм/);
  assert.deepEqual(normalizeCustomProduct(aio), aio);
  assert.deepEqual(normalizeCustomProduct(customDefaults('cooler', aio)), aio);

  const air = normalizeCustomProduct(draft('cooler', { kind: 'air', height: '160', radiator: null }));
  assert.equal(air.height, 160);
  assert.equal(air.radiator, null);
  assert.match(air.specs[0], /Воздушное · 160 мм/);
  assert.deepEqual(normalizeCustomProduct(air), air);
  assert.deepEqual(normalizeCustomProduct(customDefaults('cooler', air)), air);
});

test('existing identities remain stable and new identities are generated once', () => {
  let generated = 0;
  const generateId = () => { generated++; return 'custom-generated-000001'; };
  const input = draft('gpu');
  delete input.id;
  const first = normalizeCustomProduct(input, { generateId });
  assert.equal(first.id, 'custom-generated-000001');
  assert.equal(generated, 1);
  const edited = normalizeCustomProduct({ ...first, name: 'Goodog RTX 9090', price: 12345.6, revision: 2 }, { generateId });
  assert.equal(edited.id, first.id);
  assert.equal(edited.price, 12346);
  assert.equal(edited.revision, 2);
  assert.equal(generated, 1);
});

test('non-finite, empty and out-of-range numeric hardware values are rejected', () => {
  for (const value of [NaN, Infinity, -Infinity, 'NaN', '', null, undefined, 0, 257, 8.5]) {
    assert.throws(() => normalizeCustomProduct(draft('cpu', { cores: value })), /ядер/);
  }
  assert.throws(() => normalizeCustomProduct(draft('gpu', { length: 701 })), /Длина видеокарты/);
  assert.throws(() => normalizeCustomProduct(draft('ram', { modules: 1.5 })), /целое число/);
  assert.throws(() => normalizeCustomProduct(draft('cpu', { cores: 32, threads: 16 })), /Потоков/);
  assert.throws(() => normalizeCustomProduct(draft('cooler', { kind: 'aio', radiator: 500 })), /радиатора/);
  for (const price of [NaN, Infinity, -1, 10000001, 'not-a-price']) {
    assert.throws(() => normalizeCustomProduct(draft('cpu', { price })), /Цена/);
  }
});

test('prototype-like IDs and unknown categories are rejected before indexing the catalog', () => {
  for (const id of ['__proto__', 'prototype', 'constructor', 'custom-__proto__', 'custom-a', 'cpu-existing', 42, {}, []]) {
    assert.throws(() => normalizeCustomProduct(draft('cpu', { id })), /идентификатор/);
  }
  for (const category of ['__proto__', 'constructor', 'monitor', '', null, undefined]) {
    assert.throws(() => normalizeCustomProduct({ ...draft('cpu'), category }), /категория/);
  }
  for (const value of [null, undefined, [], 'cpu', 1]) {
    assert.throws(() => normalizeCustomProduct(value), /формат/);
  }
});

test('source links are optional HTTPS references and reject executable schemes or credentials', () => {
  assert.equal(normalizeCustomProduct(draft('cpu')).sourceUrl, '');
  const sourceUrl = 'https://www.amd.com/en/products/processors.html?model=example#specs';
  assert.equal(normalizeCustomProduct(draft('cpu', { sourceUrl })).sourceUrl, sourceUrl);
  for (const sourceUrl of ['javascript:alert(1)', 'data:text/html,hello', 'http://example.com/specs', 'https://user:pass@example.com/specs', 'not a URL', '//example.com/specs']) {
    assert.throws(() => normalizeCustomProduct(draft('cpu', { sourceUrl })), /HTTPS/);
  }
});

test('CSV arrays, socket names and structured PSU connectors remain rendering-compatible', () => {
  const cpu = normalizeCustomProduct(draft('cpu', { memoryTypes: ' ddr4, DDR5, ddr4 ', socket: ' LGA1700 ' }));
  assert.equal(cpu.socket, 'LGA1700');
  assert.deepEqual(cpu.memoryTypes, ['DDR4', 'DDR5']);
  const cooler = normalizeCustomProduct(draft('cooler', { sockets: ['AM5', ' LGA1700 ', 'AM5'] }));
  assert.deepEqual(cooler.sockets, ['AM5', 'LGA1700']);
  const psu = normalizeCustomProduct(draft('psu', { pcie8: '0', eps8: '1', native12VHPWR: 'true' }));
  assert.deepEqual(psu.connectors, { pcie8: 0, eps8: 1, native12VHPWR: true });
  assert.equal('pcie8' in psu, false);
  assert.equal('eps8' in psu, false);
  assert.deepEqual(normalizeCustomProduct(customDefaults('psu', psu)), psu);
  const chassis = normalizeCustomProduct(draft('case', { radiatorSupport: '' }));
  assert.deepEqual(chassis.radiatorSupport, []);
  assert.deepEqual(normalizeCustomProduct(chassis), chassis);
  assert.throws(() => normalizeCustomProduct(draft('cpu', { memoryTypes: 'DDR7' })), /Типы памяти/);
});

test('portable custom batches retain all records and reject duplicate IDs or oversized catalogs', () => {
  const components = customCategoryIds.map(category => normalizeCustomProduct(draft(category)));
  assert.deepEqual(normalizeCustomBatch(JSON.parse(JSON.stringify(components))), components);
  assert.deepEqual(normalizeCustomBatch([]), []);
  assert.throws(() => normalizeCustomBatch([components[0], { ...components[0], name: 'Renamed duplicate' }]), /Повторяющиеся/);
  assert.throws(() => normalizeCustomBatch(Array(201).fill(components[0])), /максимум 200/);
  assert.throws(() => normalizeCustomBatch({}), /каталог/);
});

test('a custom case that explicitly disallows radiators blocks AIO installation and boot', () => {
  const build = Object.fromEntries(customCategoryIds.map(category => [category, normalizeCustomProduct(draft(category))]));
  build.case = normalizeCustomProduct(draft('case', { radiatorSupport: [] }));
  build.cooler = normalizeCustomProduct(draft('cooler', { kind: 'aio', radiator: 240 }));
  const issue = evaluateBuild(build).errors.find(item => item.id === 'radiator-size');
  assert.ok(issue);
  assert.match(issue.message, /нет мест/);
  assert.equal(validateBoot(build, { thermalPaste: true, cablesConnected: true }).canBoot, false);
  build.cooler = normalizeCustomProduct(draft('cooler'));
  assert.equal(evaluateBuild(build).compatible, true);
});

test('an explicitly absent CPU power connector blocks compatibility and the POST power step', () => {
  const build = Object.fromEntries(customCategoryIds.map(category => [category, normalizeCustomProduct(draft(category))]));
  build.psu = normalizeCustomProduct(draft('psu', { eps8: 0 }));
  const issue = evaluateBuild(build).errors.find(item => item.id === 'psu-cpu-connector');
  assert.ok(issue);
  assert.deepEqual(issue.categories, ['psu', 'cpu']);
  const boot = validateBoot(build, { thermalPaste: true, cablesConnected: true });
  assert.equal(boot.canBoot, false);
  assert.equal(boot.steps.find(step => step.id === 'power').status, 'fail');
  build.psu.connectors.eps8 = 1;
  assert.equal(validateBoot(build, { thermalPaste: true, cablesConnected: true }).canBoot, true);
  delete build.psu.connectors.eps8;
  assert.ok(!evaluateBuild(build).errors.some(item => item.id === 'psu-cpu-connector'), 'unknown connector count must not be invented as zero');
});
