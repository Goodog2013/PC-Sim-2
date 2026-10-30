/**
 * PC Lab's deterministic simulation model.
 * Physical compatibility uses catalog specifications. Power, temperatures,
 * performance scores and FPS are educational estimates, never measurements.
 */

export const installationOrder = ['case', 'psu', 'motherboard', 'cpu', 'ram', 'storage', 'cooler', 'gpu'];
export const categoryLabels = {
  case: 'Корпус', psu: 'Блок питания', motherboard: 'Материнская плата',
  cpu: 'Процессор', ram: 'Оперативная память', storage: 'Накопитель',
  cooler: 'Охлаждение', gpu: 'Видеокарта',
};
export const benchmarkGames = [
  { id: 'cyberpunk', name: 'Cyberpunk 2077', subtitle: 'Без RT · без апскейлинга', gpu: 91, cpu: 175, ram: 16, vram: 8 },
  { id: 'cs2', name: 'Counter-Strike 2', subtitle: 'Соревновательный шутер', gpu: 285, cpu: 340, ram: 16, vram: 6 },
  { id: 'minecraft', name: 'Minecraft Java', subtitle: 'Vanilla · 16 чанков · без шейдеров', gpu: 430, cpu: 290, ram: 16, vram: 4 },
  { id: 'forza', name: 'Forza Horizon 5', subtitle: 'Без RT · без апскейлинга', gpu: 136, cpu: 220, ram: 16, vram: 8 },
];

const requiredCategories = installationOrder.filter(category => category !== 'gpu');
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const number = (value, fallback = 0) => Number.isFinite(Number(value)) && value !== null && value !== '' ? Number(value) : fallback;
const normal = value => String(value || '').trim().toLowerCase().replace(/[\s_]/g, '').replace('microatx', 'matx').replace('micro-atx', 'matx').replace('miniitx', 'mitx').replace('mini-itx', 'mitx');
const list = value => Array.isArray(value) ? value : value == null ? [] : [value];
const validBuild = build => Object.fromEntries(installationOrder.filter(key => build?.[key] && typeof build[key] === 'object').map(key => [key, build[key]]));
const installedSet = (installed, build) => installed === undefined ? new Set(Object.keys(build)) : new Set(installed);

function issue(id, severity, categories, title, message) {
  return { id, severity, categories, title, message };
}

/** Return conflicts and estimates for a category -> product map. */
export function evaluateBuild(input = {}) {
  const build = validBuild(input);
  const { cpu, motherboard, ram, gpu, storage, cooler, psu } = build;
  const chassis = build.case;
  const issues = [];
  const add = (...args) => issues.push(issue(...args));
  const missing = installationOrder.filter(category => !build[category]);
  const missingRequired = requiredCategories.filter(category => !build[category]);
  const hasDisplayOutput = Boolean(gpu || cpu?.hasIntegratedGraphics);

  if (cpu && motherboard && normal(cpu.socket) !== normal(motherboard.socket)) {
    add('cpu-socket', 'error', ['cpu', 'motherboard'], 'Не совпадает сокет', `${cpu.socket} у процессора и ${motherboard.socket} у платы. Процессор не установится в этот разъём.`);
  }
  if (cpu?.family && motherboard?.supportedCpuFamilies?.length && !motherboard.supportedCpuFamilies.includes(cpu.family)) {
    add('cpu-family', 'error', ['cpu', 'motherboard'], 'Плата не поддерживает это поколение', `Семейство ${cpu.family} отсутствует в списке поддерживаемых для этой платы.`);
  }
  if (ram && motherboard && normal(ram.memoryType) !== normal(motherboard.memoryType)) {
    add('memory-generation', 'error', ['ram', 'motherboard'], 'Несовместимый тип памяти', `Память ${ram.memoryType}, а разъёмы платы рассчитаны на ${motherboard.memoryType}.`);
  }
  if (ram && cpu && cpu.memoryTypes?.length && !cpu.memoryTypes.some(type => normal(type) === normal(ram.memoryType))) {
    add('cpu-memory', 'error', ['ram', 'cpu'], 'Контроллер CPU не поддерживает память', `Этот процессор поддерживает ${cpu.memoryTypes.join(' / ')}, выбранная память — ${ram.memoryType}.`);
  }
  if (ram && motherboard && number(ram.modules) > number(motherboard.memorySlots, 4)) {
    add('memory-slots', 'error', ['ram', 'motherboard'], 'Не хватает разъёмов DIMM', `В комплекте ${ram.modules} модуля, на плате — ${motherboard.memorySlots} разъёма.`);
  }
  if (ram && motherboard && number(motherboard.maxMemory) > 0 && number(ram.capacity) > number(motherboard.maxMemory)) {
    add('memory-capacity', 'error', ['ram', 'motherboard'], 'Превышен объём памяти', `Плата поддерживает до ${motherboard.maxMemory} ГБ, выбрано ${ram.capacity} ГБ.`);
  }
  if (motherboard && chassis?.supportedFormFactors?.length && !chassis.supportedFormFactors.some(type => normal(type) === normal(motherboard.formFactor))) {
    add('board-form-factor', 'error', ['motherboard', 'case'], 'Плата не помещается в корпус', `Формат ${motherboard.formFactor}; корпус поддерживает ${chassis.supportedFormFactors.join(', ')}.`);
  }
  const gpuLengthLimit = chassis && psu && normal(psu.formFactor) === 'atx' && number(chassis.maxGpuLengthWithAtxPsu) > 0
    ? number(chassis.maxGpuLengthWithAtxPsu) : number(chassis?.maxGpuLength);
  if (gpu && chassis && gpuLengthLimit > 0 && number(gpu.length) > gpuLengthLimit) {
    const atxRestricted = gpuLengthLimit < number(chassis.maxGpuLength);
    add('gpu-length', 'error', atxRestricted ? ['gpu', 'case', 'psu'] : ['gpu', 'case'], 'Видеокарта слишком длинная', `${gpu.length} мм при лимите корпуса ${gpuLengthLimit} мм${atxRestricted ? ' с установленным ATX-блоком питания' : ''}.`);
  }
  if (cooler && cpu && cooler.sockets?.length && !cooler.sockets.some(socket => normal(socket) === normal(cpu.socket))) {
    add('cooler-socket', 'error', ['cooler', 'cpu'], 'Нет подходящего крепления кулера', `Охлаждение не имеет указанной в каталоге поддержки сокета ${cpu.socket}.`);
  }
  const fanRaise = cooler && ram && cooler.kind !== 'aio' && number(cooler.maxRamHeight) > 0
    ? Math.max(0, number(ram.height) - number(cooler.maxRamHeight)) : 0;
  const effectiveCoolerHeight = Math.round((number(cooler?.height) + fanRaise) * 10) / 10;
  if (cooler && chassis && cooler.kind !== 'aio' && number(chassis.maxCoolerHeight) > 0 && effectiveCoolerHeight > number(chassis.maxCoolerHeight)) {
    add('cooler-height', 'error', fanRaise ? ['cooler', 'ram', 'case'] : ['cooler', 'case'], 'Кулер слишком высокий', `${effectiveCoolerHeight} мм${fanRaise ? ' с учётом подъёма вентилятора над RAM' : ''} при лимите корпуса ${chassis.maxCoolerHeight} мм.`);
  } else if (fanRaise > 0) {
    add('cooler-ram-clearance', 'warning', ['cooler', 'ram', 'case'], 'Нужно поднять вентилятор кулера', `Высота RAM ${ram.height} мм при зазоре кулера ${cooler.maxRamHeight} мм. После подъёма вентилятора высота охлаждения составит примерно ${effectiveCoolerHeight} мм.`);
  }
  if (cooler?.kind === 'aio' && Array.isArray(chassis?.radiatorSupport) && !chassis.radiatorSupport.some(size => number(size) === number(cooler.radiator))) {
    add('radiator-size', 'error', ['cooler', 'case'], 'Радиатор не помещается', chassis.radiatorSupport.length
      ? `СЖО ${cooler.radiator} мм; в корпусе предусмотрены радиаторы ${chassis.radiatorSupport.join(' / ')} мм.`
      : `В этом корпусе нет мест для радиатора СЖО; выбрано охлаждение ${cooler.radiator} мм.`);
  }
  if (cooler?.kind === 'aio' && gpu && number(chassis?.maxGpuLengthWithFrontRadiator) > 0
    && chassis?.frontRadiatorOnly?.some(size => number(size) === number(cooler.radiator))
    && number(gpu.length) > number(chassis.maxGpuLengthWithFrontRadiator)) {
    add('front-radiator-gpu-length', 'error', ['cooler', 'gpu', 'case'], 'Радиатор перекрывает место для GPU', `Радиатор ${cooler.radiator} мм ставится в этом корпусе спереди. Лимит видеокарты с ним — ${chassis.maxGpuLengthWithFrontRadiator} мм, выбрано ${gpu.length} мм.`);
  }
  if (psu && chassis && number(chassis.maxPsuLength) > 0 && number(psu.length) > number(chassis.maxPsuLength)) {
    add('psu-length', 'error', ['psu', 'case'], 'Блок питания слишком длинный', `${psu.length} мм при лимите отсека ${chassis.maxPsuLength} мм.`);
  }
  if (psu && chassis?.supportedPsuFormFactors?.length && !chassis.supportedPsuFormFactors.some(type => normal(type) === normal(psu.formFactor))) {
    add('psu-form-factor', 'error', ['psu', 'case'], 'Не подходит формат БП', `Корпус рассчитан на ${chassis.supportedPsuFormFactors.join(' / ')}, выбран ${psu.formFactor}.`);
  }
  if (storage && motherboard && normal(storage.interface).includes('nvme') && motherboard.m2Slots !== undefined && number(motherboard.m2Slots) < 1) {
    add('storage-slot', 'error', ['storage', 'motherboard'], 'Нет разъёма M.2 NVMe', 'Для выбранного накопителя нужен совместимый разъём M.2 на материнской плате.');
  }
  if (cpu && !gpu && !cpu.hasIntegratedGraphics) {
    add('no-display-output', 'warning', ['cpu', 'gpu'], 'Нужна видеокарта', 'У этого процессора нет встроенной графики. Без дискретной видеокарты изображения не будет.');
  }
  if (cpu && cooler && number(cooler.coolingCapacity) > 0 && number(cpu.peakPower, number(cpu.tdp)) > number(cooler.coolingCapacity)) {
    add('cooling-headroom', 'warning', ['cpu', 'cooler'], 'Небольшой запас охлаждения', 'По модели симулятора под длительной нагрузкой возможен троттлинг. Реальная температура зависит от лимитов CPU, корпуса и установки.');
  }
  if (ram && number(ram.modules) === 1) {
    add('single-channel', 'warning', ['ram'], 'Один модуль памяти', 'Двухканальный комплект обычно лучше подходит для игровой сборки.');
  }
  if (ram && number(ram.capacity) < 16) {
    add('memory-low', 'warning', ['ram'], 'Мало памяти для современных игр', 'В модели симулятора объём менее 16 ГБ снижает FPS и плавность.');
  }
  if (cooler?.kind === 'aio' && gpu && chassis && number(chassis.maxGpuLength) - number(gpu.length) < 35) {
    add('radiator-clearance', 'warning', ['cooler', 'gpu', 'case'], 'Проверь место для радиатора', 'При установке СЖО спереди радиатор и вентиляторы могут уменьшить доступную длину для видеокарты.');
  }

  const cpuPower = cpu ? number(cpu.peakPower, number(cpu.tdp, 65)) : 0;
  const gpuPower = gpu ? number(gpu.power, 0) : 0;
  const platformPower = (motherboard ? 35 : 0) + (ram ? number(ram.modules, 2) * 4 : 0)
    + (storage ? number(storage.power, 7) : 0) + (chassis ? 12 : 0) + (cooler ? cooler.kind === 'aio' ? 12 : 5 : 0);
  const estimated = Math.round(cpuPower + gpuPower + platformPower);
  const recommended = estimated ? Math.ceil(Math.max(estimated * 1.25, number(gpu?.recommendedPsu), 300) / 50) * 50 : 0;
  const watts = number(psu?.watts);
  const loadPercent = watts ? Math.round(estimated / watts * 100) : 0;
  const headroom = watts ? watts - estimated : 0;
  if (psu && estimated > watts) {
    add('psu-overload', 'error', ['psu', 'cpu', 'gpu'], 'Не хватает мощности БП', `Расчётная пиковая нагрузка ${estimated} Вт, блок питания — ${watts} Вт. Рекомендуется от ${recommended} Вт.`);
  } else if (psu && watts < recommended) {
    add('psu-headroom', 'warning', ['psu', 'cpu', 'gpu'], 'Малый запас мощности', `Расчётная нагрузка ${estimated} Вт. С учётом запаса и рекомендации видеокарты лучше от ${recommended} Вт.`);
  }

  // Connector adapters may be supplied with GPUs. Treat an absent native cable
  // as a reminder, rather than inventing a hard incompatibility.
  if (cpu && psu?.connectors && !Array.isArray(psu.connectors)
    && psu.connectors.eps8 !== undefined && number(psu.connectors.eps8, 1) < 1) {
    add('psu-cpu-connector', 'error', ['psu', 'cpu'], 'Нет разъёма питания процессора', 'У выбранного БП не указан ни один разъём CPU EPS 8-pin. Для питания процессора выбери БП с подходящим CPU-кабелем.');
  }
  if (gpu?.powerConnector && psu?.connectors) {
    const structuredConnectors = typeof psu.connectors === 'object' && !Array.isArray(psu.connectors);
    const description = structuredConnectors ? '' : list(psu.connectors).join(' ');
    const needs16Pin = /12vhpwr|12v-?2x6|16.pin/i.test(gpu.powerConnector);
    const native16Pin = structuredConnectors ? Boolean(psu.connectors.native12VHPWR || psu.connectors.native12V2x6) : /12vhpwr|12v-?2x6|16.pin/i.test(description);
    if (needs16Pin && !native16Pin) {
      add('gpu-power-adapter', 'warning', ['gpu', 'psu'], 'Понадобится адаптер питания GPU', 'В каталоге БП не указан родной 16-pin кабель. Проверь комплектный адаптер видеокарты и количество отдельных PCIe-кабелей.');
      if (structuredConnectors && number(gpu.adapterPcie8) > number(psu.connectors.pcie8)) {
        add('gpu-adapter-connectors', 'error', ['gpu', 'psu'], 'Не хватает питания для адаптера GPU', `Для адаптера этой видеокарты нужны ${gpu.adapterPcie8} разъёма PCIe 8-pin, у БП в каталоге указано ${number(psu.connectors.pcie8)}.`);
      }
    }
    const eightPinCount = needs16Pin ? 0 : number(gpu.requiredPcieConnectors,
      /^(\d+)\s*[×x*]/.exec(gpu.powerConnector)?.[1]
      || (/8.pin/i.test(gpu.powerConnector) ? (/6.pin/i.test(gpu.powerConnector) ? 2 : 1) : /6.pin/i.test(gpu.powerConnector) ? 1 : 0));
    if (structuredConnectors && number(eightPinCount) > number(psu.connectors.pcie8)) {
      add('gpu-power-connectors', 'error', ['gpu', 'psu'], 'Не хватает разъёмов питания GPU', `Видеокарте нужны ${eightPinCount} разъёма PCIe 8-pin, у БП в каталоге указано ${number(psu.connectors.pcie8)}.`);
    }
  }

  for (const [category, product] of Object.entries(build)) {
    if (product.unknownSpecs?.length) {
      add(`unknown-specs-${category}`, 'warning', [category], 'Есть характеристики для уточнения',
        `${product.name}: часть ограничений отсутствует в доступной спецификации. Проверь примечание в карточке и руководство производителя; эти ограничения не участвуют в автоматической проверке.`);
    }
  }

  if (missing.length) {
    add('missing-parts', 'info', missing, 'Сборка ещё не завершена', `Осталось выбрать: ${missing.map(category => categoryLabels[category].toLowerCase()).join(', ')}.`);
  }

  const cpuScore = number(cpu?.score);
  const gpuScore = number(gpu?.score, cpu?.hasIntegratedGraphics ? 10 : 0);
  const memoryFactor = ram ? clamp(number(ram.capacity) / 16, .25, 1) * (number(ram.modules) === 1 ? .9 : 1) : 0;
  const gaming = cpu && hasDisplayOutput && ram ? clamp(Math.round((gpuScore * .78 + cpuScore * .22) * memoryFactor / 1.6), 0, 100) : 0;
  const productivityIndex = number(cpu?.threads) ? cpuScore * .45 + number(cpu.threads) * 3.5 + number(cpu.cores) * .9 : cpuScore;
  const workstation = cpu && ram ? clamp(Math.round((productivityIndex * .55 + gpuScore * .25 + Math.min(number(ram.capacity), 128) * .45) / 1.6), 0, 100) : 0;
  const temperature = cpu && cooler ? Math.round(clamp(23 + cpuPower / Math.max(number(cooler.coolingCapacity, 150), 1) * 52, 28, 100)) : null;
  const errors = issues.filter(item => item.severity === 'error');
  const warnings = issues.filter(item => item.severity === 'warning');
  return {
    issues, errors, warnings, missing, missingRequired,
    complete: missing.length === 0,
    bootableConfiguration: missingRequired.length === 0 && hasDisplayOutput && errors.length === 0,
    compatible: errors.length === 0,
    selectedCount: installationOrder.length - missing.length,
    totalPrice: Object.values(build).reduce((total, product) => total + Math.max(0, number(product.price)), 0),
    power: { estimated, recommended, headroom, loadPercent, cpu: cpuPower, gpu: gpuPower, platform: platformPower, capacity: watts, idle: estimated ? Math.round(25 + cpuPower * .06 + gpuPower * .05 + platformPower * .45) : 0 },
    performance: { gaming, workstation, memory: number(ram?.capacity), storage: number(storage?.capacity), cpu: cpuScore, gpu: gpuScore, tier: gaming >= 85 ? 'Энтузиаст' : gaming >= 60 ? 'Игровая' : gaming >= 35 ? 'Сбалансированная' : 'Базовая' },
    thermals: { cpu: temperature, simulated: true },
    estimatedTemperature: temperature,
    simulated: true,
  };
}

/** Check only conflicts involving a proposed replacement, not existing unrelated errors. */
export function candidateStatus(input, product) {
  if (!product || !installationOrder.includes(product.category)) {
    return { compatible: false, issues: [issue('invalid-product', 'error', [], 'Неизвестный компонент', 'Выберите компонент из каталога.')] };
  }
  const build = { ...validBuild(input), [product.category]: product };
  const issues = evaluateBuild(build).issues.filter(item => item.id !== 'missing-parts' && item.categories.includes(product.category));
  return { compatible: !issues.some(item => item.severity === 'error'), issues, warnings: issues.filter(item => item.severity === 'warning') };
}

/** FPS values are intentionally a transparent synthetic model, not benchmarks. */
export function estimateBenchmark(input, { resolution = '1440p', game = 'cyberpunk', preset = 'high' } = {}) {
  const build = validBuild(input);
  const model = benchmarkGames.find(item => item.id === game) || benchmarkGames[0];
  const assessment = evaluateBuild(build);
  const reason = !build.cpu || !build.ram || !(build.gpu || build.cpu?.hasIntegratedGraphics)
    ? 'Выберите процессор, оперативную память и видеокарту или CPU со встроенной графикой.'
    : !assessment.compatible ? 'Сначала устраните несовместимость компонентов.' : null;
  if (reason) return { available: false, fps: 0, avgFps: 0, low1: 0, onePercentLow: 0, reason, simulated: true, game: model.name };

  const scale = { '1080p': 1.42, '1440p': 1, '4k': .54, '2160p': .54 }[resolution] || 1;
  const qualityFactor = preset === 'ultra' ? .82 : preset === 'medium' ? 1.2 : 1;
  const cpuScore = Math.max(1, number(build.cpu.score, 50));
  const gpuScore = Math.max(1, number(build.gpu?.score, build.cpu.hasIntegratedGraphics ? 10 : 0));
  const capacity = number(build.ram.capacity, 8);
  const memoryFactor = clamp(capacity / model.ram, .35, 1) * (number(build.ram.modules) === 1 ? .87 : 1);
  const requiredVram = model.vram * (scale < 1 ? 1.4 : scale > 1 ? .75 : 1);
  const vram = number(build.gpu?.vram, 2);
  const vramFactor = clamp(vram / requiredVram, .5, 1);
  const gpuFps = model.gpu * gpuScore / 100 * scale * qualityFactor * vramFactor;
  const cpuFps = model.cpu * cpuScore / 100;
  const fps = Math.max(1, Math.round(Math.min(gpuFps, cpuFps) * memoryFactor));
  const low1 = Math.max(1, Math.round(fps * (capacity >= model.ram ? .74 : .56) * (vramFactor < 1 ? .88 : 1)));
  const bottleneck = memoryFactor < .85 ? 'memory' : cpuFps < gpuFps ? 'cpu' : 'gpu';
  const bottleneckLabel = { cpu: 'Процессор', gpu: build.gpu ? 'Видеокарта' : 'Встроенная графика', memory: 'Оперативная память' }[bottleneck];
  const notes = ['Расчётная модель: это не результат реального игрового теста.', 'Без трассировки лучей, генерации кадров и апскейлинга.'];
  if (!build.gpu) notes.push('Для встроенной графики используется упрощённая общая оценка.');
  if (vramFactor < 1) notes.push('Модель учитывает недостаточный объём видеопамяти для выбранного разрешения.');
  return {
    available: true, fps, avgFps: fps, low1, onePercentLow: low1,
    cpuLimitedFps: Math.round(cpuFps), gpuLimitedFps: Math.round(gpuFps),
    bottleneck, bottleneckLabel, game: model.name, resolution, preset,
    simulated: true, confidence: 'simulation', notes,
    explanation: `Расчётная производительность зависит от условных индексов CPU/GPU, разрешения и памяти. Основное ограничение в этой модели: ${bottleneckLabel.toLowerCase()}.`,
  };
}

/** Physical prerequisites for placing a selected component in the chassis. */
export function getInstallBlockers(category, input = {}, installed = []) {
  const build = validBuild(input);
  if (!installationOrder.includes(category)) return ['Неизвестный тип компонента.'];
  if (!build[category]) return [`Сначала выберите компонент: ${categoryLabels[category].toLowerCase()}.`];
  const placed = installedSet(installed, build);
  const dependencies = {
    case: [], psu: ['case'], motherboard: ['case'], cpu: ['motherboard'],
    ram: ['motherboard'], storage: ['motherboard'], cooler: ['cpu'], gpu: ['motherboard'],
  }[category];
  const blockers = dependencies.filter(key => !placed.has(key)).map(key => `Сначала установите: ${categoryLabels[key].toLowerCase()}.`);
  const compatibility = candidateStatus(build, build[category]);
  blockers.push(...compatibility.issues.filter(item => item.severity === 'error').map(item => item.message));
  return blockers;
}

/** Educational POST sequence: hardware installation + wiring + thermal paste. */
export function validateBoot(input = {}, { installed, thermalPaste = false, cablesConnected = false } = {}) {
  const build = validBuild(input);
  const placed = installedSet(installed, build);
  const evaluation = evaluateBuild(build);
  const missing = requiredCategories.filter(category => !build[category] || !placed.has(category));
  const gpuInstalled = Boolean(build.gpu && placed.has('gpu'));
  const display = gpuInstalled || Boolean(build.cpu?.hasIntegratedGraphics);
  const cpuInstalled = Boolean(build.cpu && placed.has('cpu'));
  const ramInstalled = Boolean(build.ram && placed.has('ram'));
  const boardInstalled = Boolean(build.motherboard && placed.has('motherboard'));
  const coolerInstalled = Boolean(build.cooler && placed.has('cooler'));
  const boardCpuOk = boardInstalled && cpuInstalled && !evaluation.errors.some(item => ['cpu-socket', 'cpu-family'].includes(item.id));
  const memoryOk = ramInstalled && !evaluation.errors.some(item => item.categories.includes('ram'));
  const storageOk = Boolean(build.storage && placed.has('storage')) && !evaluation.errors.some(item => item.categories.includes('storage'));
  const powerOk = Boolean(build.psu && placed.has('psu')) && cablesConnected && !evaluation.errors.some(item => item.id.startsWith('psu-'));
  const coolingOk = coolerInstalled && thermalPaste && !evaluation.errors.some(item => item.categories.includes('cooler'));
  const check = (id, name, pass, message, failure) => ({ id, name, status: pass ? 'pass' : 'fail', message: pass ? message : failure });
  const steps = [
    check('power', 'Питание', powerOk, 'Питание подключено, мощности достаточно.', !cablesConnected ? 'Подключите питание платы, CPU и GPU.' : 'Установите подходящий блок питания.'),
    check('cpu', 'Процессор', boardCpuOk, `${build.cpu?.name || 'CPU'} определён.`, 'Установите процессор и совместимую материнскую плату.'),
    check('memory', 'Оперативная память', memoryOk, `${number(build.ram?.capacity)} ГБ памяти определено.`, 'Установите совместимую оперативную память.'),
    check('cooling', 'Охлаждение', coolingOk, 'Термопаста нанесена, охлаждение установлено.', !thermalPaste ? 'Нанесите термопасту перед запуском.' : 'Установите подходящее охлаждение.'),
    check('graphics', 'Видеосигнал', display, gpuInstalled ? 'Дискретная видеокарта определена.' : 'Используется встроенная графика CPU.', 'У CPU нет доступной встроенной графики. Установите видеокарту.'),
    check('storage', 'Накопитель', storageOk, 'Накопитель определён. Симуляция загрузки готова.', 'Установите совместимый накопитель.'),
    check('assembly', 'Проверка сборки', missing.length === 0 && evaluation.compatible, 'Все обязательные компоненты установлены.', missing.length ? `Не установлено: ${missing.map(category => categoryLabels[category].toLowerCase()).join(', ')}.` : 'Устраните конфликт компонентов.'),
  ];
  const canBoot = steps.every(step => step.status === 'pass');
  return { canBoot, steps, issues: evaluation.issues.filter(item => item.severity !== 'info'), missing, evaluation, simulated: true };
}
