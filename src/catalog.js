import { extraPlatformProducts } from './catalog-extra-platforms.js';
import { extraHardwareProducts } from './catalog-extra-hardware.js';

/**
 * Curated, real hardware. Manufacturer references were checked 2026-10-30.
 * `price`, `score`, `coolingCapacity`, and power estimates are simulation inputs,
 * not current shop offers, measured FPS, or guaranteed thermal performance.
 * Dimensions are in millimetres, capacities in GB, and memory speed in MT/s.
 * See docs/HARDWARE_SOURCES.md for provenance and important model limitations.
 */
export const catalogMeta = {
  updatedAt: '2026-10-30',
  currency: 'RUB',
  priceLabel: 'Условные цены симулятора',
  performanceLabel: 'Расчётная модель — не реальные бенчмарки',
  description: 'Реальные модели и характеристики. Цены — игровая экономика, а не предложения магазинов.',
};

export const categories = [
  { id: 'cpu', label: 'Процессоры', shortLabel: 'Процессор', icon: 'cpu', description: 'Вычислительный центр твоей сборки' },
  { id: 'gpu', label: 'Видеокарты', shortLabel: 'Видеокарта', icon: 'gpu', description: 'Больше кадров. Больше возможностей.' },
  { id: 'motherboard', label: 'Материнские платы', shortLabel: 'Мат. плата', icon: 'motherboard', description: 'Основа, которая соединяет всё' },
  { id: 'ram', label: 'Оперативная память', shortLabel: 'Память', icon: 'ram', description: 'Запас пространства для задач' },
  { id: 'storage', label: 'Накопители', shortLabel: 'SSD', icon: 'storage', description: 'Быстрый старт и место для игр' },
  { id: 'cooler', label: 'Охлаждение', shortLabel: 'Охлаждение', icon: 'cooler', description: 'Держим температуру под контролем' },
  { id: 'psu', label: 'Блоки питания', shortLabel: 'Блок питания', icon: 'psu', description: 'Энергия с запасом' },
  { id: 'case', label: 'Корпуса', shortLabel: 'Корпус', icon: 'case', description: 'Новый дом для твоего железа' },
];

const urls = {
  amd: 'https://www.amd.com/en/products/processors/desktops/ryzen/',
  intel12400: 'https://www.intel.com/content/www/us/en/products/sku/134587/intel-core-i512400f-processor-18m-cache-up-to-4-40-ghz/specifications.html',
  intel13600: 'https://www.intel.com/content/www/us/en/products/sku/230493/intel-core-i513600k-processor-24m-cache-up-to-5-10-ghz/specifications.html',
  intel14700: 'https://www.intel.com/content/www/us/en/products/sku/236783/intel-core-i7-processor-14700k-33m-cache-up-to-5-60-ghz/specifications.html',
  nvidia4070: 'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4070-family/',
  nvidia4080: 'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4080-family/',
  nvidia4090: 'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/',
  kingston4: 'https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr4-memory',
  kingston5: 'https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr5-memory',
  kc3000: 'https://www.kingston.com/en/ssd/kc3000-nvme-m2-solid-state-drive',
  nv3: 'https://www.kingston.com/en/ssd/nv3-nvme-pcie-ssd',
};
const msi = (kind, slug) => `https://www.msi.com/${kind}/${slug}/Specification`;
const allSockets = ['AM4', 'AM5', 'LGA1700'];
const intelFamilies = ['Intel 12', 'Intel 13', 'Intel 14'];

function cpu(id, brand, name, price, socket, cores, threads, baseClock, boostClock, tdp, peakPower, score, sourceUrl, extra = {}) {
  return { id, category: 'cpu', brand, name, price, socket, cores, threads, baseClock, boostClock, tdp, peakPower, score,
    memoryTypes: socket === 'LGA1700' ? ['DDR4', 'DDR5'] : [socket === 'AM4' ? 'DDR4' : 'DDR5'],
    family: socket === 'AM4' ? 'Ryzen 5000' : socket === 'AM5' ? 'Ryzen 7000' : `Intel ${name.match(/\d{5}/)?.[0].slice(0, 2)}`,
    hasIntegratedGraphics: socket === 'AM5' || (brand === 'Intel' && !name.endsWith('F')),
    specs: [`${cores} ядер · ${threads} потоков`, `до ${boostClock.toLocaleString('ru-RU')} ГГц`, `${socket} · ${tdp} Вт`], sourceUrl, ...extra };
}
function gpu(id, brand, name, price, vram, power, recommendedPsu, length, slots, powerConnector, score, sourceUrl, extra = {}) {
  return { id, category: 'gpu', brand, name, price, vram, power, recommendedPsu, length, slots, powerConnector, score,
    specs: [`${vram} ГБ видеопамяти`, `${length} мм · ${power} Вт`, `${slots} слота`], sourceUrl, ...extra };
}
function board(id, brand, name, price, socket, memoryType, formFactor, maxMemory, m2Slots, sourceUrl, extra = {}) {
  return { id, category: 'motherboard', brand, name, price, socket, memoryType, formFactor, memorySlots: 4, maxMemory, m2Slots,
    supportedCpuFamilies: socket === 'LGA1700' ? intelFamilies : socket === 'AM4' ? ['Ryzen 5000'] : ['Ryzen 7000', 'Ryzen 8000', 'Ryzen 9000'],
    specs: [`${socket} · ${memoryType}`, `${formFactor} · 4 слота RAM`, `${m2Slots} × M.2 NVMe`], sourceUrl, ...extra };
}
function ram(id, brand, name, price, memoryType, capacity, modules, speed, height, sourceUrl, extra = {}) {
  return { id, category: 'ram', brand, name, price, memoryType, capacity, modules, speed, height,
    specs: [`${capacity} ГБ · ${modules} × ${capacity / modules} ГБ`, `${memoryType} · ${speed} MT/s`, `${height} мм`], sourceUrl, ...extra };
}
function ssd(id, family, price, capacity, readSpeed, writeSpeed, sourceUrl) {
  const size = capacity >= 1000 ? `${capacity / (capacity % 1024 === 0 ? 1024 : 1000)} ТБ` : `${capacity} ГБ`;
  return { id, category: 'storage', brand: 'Kingston', name: `${family} ${size}`, price, capacity, readSpeed, writeSpeed,
    interface: 'NVMe', formFactor: 'M.2 2280', pcie: 4, power: 8,
    specs: [`${size} · PCIe 4.0 ×4`, `до ${readSpeed.toLocaleString('ru-RU')} МБ/с`, 'M.2 2280 · NVMe'], sourceUrl };
}
function cooler(id, brand, name, price, kind, height, radiator, coolingCapacity, sourceUrl, extra = {}) {
  return { id, category: 'cooler', brand, name, price, kind, height, radiator, coolingCapacity, sockets: [...allSockets],
    specs: kind === 'aio' ? [`СЖО · ${radiator} мм`, 'Радиатор 38 мм', 'AM4 / AM5 / LGA1700'] : ['Воздушное охлаждение', `Высота ${height} мм`, 'AM4 / AM5 / LGA1700'],
    sourceUrl, ...extra };
}
function psu(id, brand, name, price, watts, length, efficiency, modular, connectors, sourceUrl) {
  return { id, category: 'psu', brand, name, price, watts, length, efficiency, modular, formFactor: 'ATX', connectors,
    specs: [`${watts} Вт · ${efficiency}`, modular ? 'Модульные кабели' : 'Фиксированные кабели', `ATX · ${length} мм`], sourceUrl };
}
function pcCase(id, brand, name, price, supportedFormFactors, maxGpuLength, maxCoolerHeight, maxPsuLength, radiatorSupport, sourceUrl, extra = {}) {
  return { id, category: 'case', brand, name, price, supportedFormFactors, maxGpuLength, maxCoolerHeight, maxPsuLength, radiatorSupport,
    specs: [`${supportedFormFactors.join(' / ')}`, `GPU до ${maxGpuLength} мм`, `Кулер до ${maxCoolerHeight} мм`], sourceUrl, ...extra };
}

export const products = [
  // CPU score: illustrative relative gaming index; 7800X3D = 100.
  cpu('ryzen-5600x', 'AMD', 'Ryzen 5 5600X', 11500, 'AM4', 6, 12, 3.7, 4.6, 65, 88, 57, `${urls.amd}5000-series/amd-ryzen-5-5600x.html`),
  cpu('ryzen-5900x', 'AMD', 'Ryzen 9 5900X', 24500, 'AM4', 12, 24, 3.7, 4.8, 105, 142, 63, `${urls.amd}5000-series/amd-ryzen-9-5900x.html`),
  cpu('ryzen-7600', 'AMD', 'Ryzen 5 7600', 19500, 'AM5', 6, 12, 3.8, 5.1, 65, 88, 78, `${urls.amd}7000-series/amd-ryzen-5-7600.html`, { tag: 'Оптимальный выбор' }),
  cpu('ryzen-7700x', 'AMD', 'Ryzen 7 7700X', 29500, 'AM5', 8, 16, 4.5, 5.4, 105, 142, 85, `${urls.amd}7000-series/amd-ryzen-7-7700x.html`),
  cpu('ryzen-7800x3d', 'AMD', 'Ryzen 7 7800X3D', 42900, 'AM5', 8, 16, 4.2, 5, 120, 162, 100, `${urls.amd}7000-series/amd-ryzen-7-7800x3d.html`, { tag: '3D V-Cache' }),
  cpu('ryzen-7950x', 'AMD', 'Ryzen 9 7950X', 56500, 'AM5', 16, 32, 4.5, 5.7, 170, 230, 89, `${urls.amd}7000-series/amd-ryzen-9-7950x.html`, { tag: 'Для тяжёлых задач' }),
  cpu('i5-12400f', 'Intel', 'Core i5-12400F', 10900, 'LGA1700', 6, 12, 2.5, 4.4, 65, 117, 58, urls.intel12400),
  cpu('i5-13600k', 'Intel', 'Core i5-13600K', 26900, 'LGA1700', 14, 20, 3.5, 5.1, 125, 181, 87, urls.intel13600, { performanceCores: 6, efficiencyCores: 8 }),
  cpu('i7-14700k', 'Intel', 'Core i7-14700K', 41500, 'LGA1700', 20, 28, 3.4, 5.6, 125, 253, 95, urls.intel14700, { performanceCores: 8, efficiencyCores: 12 }),

  // Exact board variants matter: dimensions are not interchangeable across AIBs.
  gpu('rtx-3060', 'MSI', 'GeForce RTX 3060 VENTUS 2X 12G OC', 27900, 12, 170, 550, 235, 2, '8-pin', 44, msi('Graphics-Card', 'GeForce-RTX-3060-VENTUS-2X-12G-OC'), { chipBrand: 'NVIDIA', shortName: 'GeForce RTX 3060', color: '#667b68' }),
  gpu('rtx-4060', 'MSI', 'GeForce RTX 4060 VENTUS 2X BLACK 8G OC', 33900, 8, 120, 550, 199, 2, '8-pin', 55, msi('Graphics-Card', 'GeForce-RTX-4060-VENTUS-2X-BLACK-8G-OC'), { chipBrand: 'NVIDIA', shortName: 'GeForce RTX 4060', note: 'Производитель указывает 115 или 120 Вт; расчёт использует 120 Вт.' }),
  gpu('rtx-4060-ti-16', 'MSI', 'GeForce RTX 4060 Ti VENTUS 2X BLACK 16G OC', 46900, 16, 165, 550, 199, 2, '8-pin', 69, msi('Graphics-Card', 'GeForce-RTX-4060-Ti-VENTUS-2X-BLACK-16G-OC'), { chipBrand: 'NVIDIA', shortName: 'GeForce RTX 4060 Ti', tag: '16 ГБ VRAM' }),
  gpu('rtx-4070', 'NVIDIA', 'GeForce RTX 4070 Founders Edition', 58900, 12, 200, 650, 244, 2, '12VHPWR', 86, urls.nvidia4070, { shortName: 'GeForce RTX 4070', adapterPcie8: 2 }),
  gpu('rtx-4070-super', 'NVIDIA', 'GeForce RTX 4070 SUPER Founders Edition', 68900, 12, 220, 650, 244, 2, '12VHPWR', 100, urls.nvidia4070, { shortName: 'GeForce RTX 4070 SUPER', adapterPcie8: 2, tag: 'Выбор для 1440p' }),
  gpu('rtx-4080-super', 'NVIDIA', 'GeForce RTX 4080 SUPER Founders Edition', 115000, 16, 320, 750, 304, 3, '12VHPWR', 140, urls.nvidia4080, { shortName: 'GeForce RTX 4080 SUPER', adapterPcie8: 3 }),
  gpu('rtx-4090', 'NVIDIA', 'GeForce RTX 4090 Founders Edition', 209000, 24, 450, 850, 304, 3, '12VHPWR', 180, urls.nvidia4090, { shortName: 'GeForce RTX 4090', adapterPcie8: 3, tag: 'Без компромиссов' }),
  gpu('rx-7600', 'AMD', 'Radeon RX 7600', 25900, 8, 165, 550, 204, 2, '8-pin', 52, 'https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7600.html'),
  gpu('rx-7800-xt', 'AMD', 'Radeon RX 7800 XT', 55900, 16, 263, 700, 267, 2.5, '2×8-pin', 98, 'https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7800-xt.html', { tag: '16 ГБ VRAM' }),

  board('b550-a-pro', 'MSI', 'B550-A PRO', 11900, 'AM4', 'DDR4', 'ATX', 128, 2, msi('Motherboard', 'B550-A-PRO')),
  board('b550m-pro', 'MSI', 'B550M PRO-VDH WIFI', 10900, 'AM4', 'DDR4', 'mATX', 128, 2, msi('Motherboard', 'B550M-PRO-VDH-WIFI'), { wifi: true }),
  board('b650-gaming-plus', 'MSI', 'B650 GAMING PLUS WIFI', 17900, 'AM5', 'DDR5', 'ATX', 256, 2, msi('Motherboard', 'B650-GAMING-PLUS-WIFI'), { wifi: true }),
  board('b650m-a', 'MSI', 'PRO B650M-A WIFI', 15900, 'AM5', 'DDR5', 'mATX', 256, 2, msi('Motherboard', 'PRO-B650M-A-WIFI'), { wifi: true }),
  board('b760m-ds3h', 'GIGABYTE', 'B760M DS3H DDR4', 11900, 'LGA1700', 'DDR4', 'mATX', 128, 2, 'https://www.gigabyte.com/Motherboard/B760M-DS3H-DDR4-rev-1x', { note: 'Ревизия 1.x. Для процессоров 14-го поколения проверьте версию BIOS.' }),
  board('b760-p', 'MSI', 'PRO B760-P WIFI DDR4', 14900, 'LGA1700', 'DDR4', 'ATX', 128, 2, msi('Motherboard', 'PRO-B760-P-WIFI-DDR4'), { wifi: true }),
  board('z790-tomahawk', 'MSI', 'MAG Z790 TOMAHAWK WIFI', 27900, 'LGA1700', 'DDR5', 'ATX', 256, 4, msi('Motherboard', 'MAG-Z790-TOMAHAWK-WIFI'), { wifi: true }),

  ram('beast-ddr4-16', 'Kingston', 'FURY Beast 16 ГБ DDR4-3200', 3900, 'DDR4', 16, 2, 3200, 34.1, urls.kingston4, { cl: 16, profiles: ['XMP'] }),
  ram('beast-ddr4-32', 'Kingston', 'FURY Beast 32 ГБ DDR4-3200', 6900, 'DDR4', 32, 2, 3200, 34.1, urls.kingston4, { cl: 16, profiles: ['XMP'] }),
  ram('beast-ddr4-32-3600', 'Kingston', 'FURY Beast 32 ГБ DDR4-3600', 7500, 'DDR4', 32, 2, 3600, 34.1, urls.kingston4, { cl: 18, profiles: ['XMP'] }),
  ram('beast-ddr4-64', 'Kingston', 'FURY Beast 64 ГБ DDR4-3200', 12900, 'DDR4', 64, 2, 3200, 34.1, urls.kingston4, { profiles: ['XMP'] }),
  ram('beast-ddr5-32-5200', 'Kingston', 'FURY Beast 32 ГБ DDR5-5200', 9500, 'DDR5', 32, 2, 5200, 34.9, urls.kingston5, { profiles: ['XMP'] }),
  ram('beast-ddr5-32', 'Kingston', 'FURY Beast 32 ГБ DDR5-6000 EXPO', 11500, 'DDR5', 32, 2, 6000, 34.9, 'https://www.kingston.com/datasheets/KF560C36BBEK2-32.pdf', { cl: 36, profiles: ['EXPO', 'XMP'], tag: 'Sweet spot' }),
  ram('beast-ddr5-64', 'Kingston', 'FURY Beast 64 ГБ DDR5-6000', 21900, 'DDR5', 64, 2, 6000, 34.9, urls.kingston5, { profiles: ['EXPO', 'XMP'] }),
  ram('vengeance-ddr5-32', 'Corsair', 'VENGEANCE 32 ГБ DDR5-6000 CL30', 13900, 'DDR5', 32, 2, 6000, 35, 'https://www.corsair.com/us/en/p/memory/cmk32gx5m2b6000c30/vengeance-32gb-2x16gb-ddr5-dram-6000mt-s-cl30-memory-kit-black-cmk32gx5m2b6000c30', { cl: 30, profiles: ['XMP'] }),

  ssd('nv3-500', 'NV3', 3500, 500, 5000, 3000, urls.nv3),
  ssd('nv3-1tb', 'NV3', 5900, 1000, 6000, 4000, urls.nv3),
  ssd('nv3-2tb', 'NV3', 10900, 2000, 6000, 5000, urls.nv3),
  ssd('kc3000-512', 'KC3000', 5900, 512, 7000, 3900, urls.kc3000),
  ssd('kc3000-1tb', 'KC3000', 8500, 1024, 7000, 6000, urls.kc3000),
  ssd('kc3000-2tb', 'KC3000', 14900, 2048, 7000, 7000, urls.kc3000),
  ssd('kc3000-4tb', 'KC3000', 29900, 4096, 7000, 7000, urls.kc3000),

  cooler('assassin-x-120', 'Thermalright', 'Assassin X 120 Refined SE', 2100, 'air', 148, null, 150, 'https://www.thermalright.com/product/assassin-x-120-refined-se/'),
  cooler('peerless-assassin', 'Thermalright', 'Peerless Assassin 120 SE', 4500, 'air', 155, null, 220, 'https://www.thermalright.com/product/peerless-assassin-120-se/', { tag: 'Двойная башня' }),
  cooler('ak620', 'DeepCool', 'AK620', 6500, 'air', 160, null, 230, 'https://www.deepcool.com/products/Cooling/cpuaircoolers/AK620-High-Performance-CPU-Cooler/2021/13067.shtml', { maxRamHeight: 43 }),
  cooler('nh-d15', 'Noctua', 'NH-D15', 12900, 'air', 165, null, 230, 'https://www.noctua.at/en/products/nh-d15', { maxRamHeight: 32, note: 'Оригинальный NH-D15:165 мм. При высокой RAM передний вентилятор поднимается. Страница характеристик производителя содержит противоречие168 мм; используем описание оригинальной модели, отдельно от NH-D15 G2.' }),
  cooler('liquid-freezer-240', 'ARCTIC', 'Liquid Freezer III 240', 9500, 'aio', null, 240, 240, 'https://www.arctic.de/en/Liquid-Freezer-III-240/ACFRE00134A', { radiatorThickness: 38, fanThickness: 25 }),
  cooler('liquid-freezer-360', 'ARCTIC', 'Liquid Freezer III 360', 12900, 'aio', null, 360, 300, 'https://www.arctic.de/en/Liquid-Freezer-III-360/ACFRE00136A', { radiatorThickness: 38, fanThickness: 25, tag: '360 мм СЖО' }),

  psu('mag-a650bn', 'MSI', 'MAG A650BN', 4900, 650, 140, '80 PLUS Bronze', false, { pcie8: 2, eps8: 1, native12VHPWR: false }, msi('Power-Supply', 'MAG-A650BN')),
  psu('mag-a750gl', 'MSI', 'MAG A750GL PCIE5', 9900, 750, 140, '80 PLUS Gold', true, { pcie8: 3, eps8: 2, native12VHPWR: true }, msi('Power-Supply', 'MAG-A750GL-PCIE5')),
  psu('mag-a850gl', 'MSI', 'MAG A850GL PCIE5', 11500, 850, 140, '80 PLUS Gold', true, { pcie8: 4, eps8: 2, native12VHPWR: true }, msi('Power-Supply', 'MAG-A850GL-PCIE5')),
  psu('rm750x', 'Corsair', 'RM750x (2021)', 11900, 750, 160, '80 PLUS Gold', true, { pcie8: 4, eps8: 2, native12VHPWR: false }, 'https://www.corsair.com/us/en/p/psu/cp-9020199-na/rmx-series-rm750x-750-watt-80-plus-gold-fully-modular-atx-psu-cp-9020199-na'),
  psu('rm850x', 'Corsair', 'RM850x (2021)', 13900, 850, 160, '80 PLUS Gold', true, { pcie8: 4, eps8: 3, native12VHPWR: false }, 'https://www.corsair.com/us/en/p/psu/cp-9020200-na/rmx-series-rm850x-850-watt-80-plus-gold-fully-modular-atx-psu-cp-9020200-na'),
  psu('rm1000x', 'Corsair', 'RM1000x (2021)', 18500, 1000, 180, '80 PLUS Gold', true, { pcie8: 6, eps8: 3, native12VHPWR: false }, 'https://www.corsair.com/us/en/p/psu/cp-9020201-na/rmx-series-rm1000x-1000-watt-80-plus-gold-fully-modular-atx-psu-cp-9020201-na'),

  pcCase('4000d-airflow', 'Corsair', '4000D AIRFLOW', 10900, ['ATX', 'mATX', 'Mini-ITX'], 360, 170, 220, [120, 140, 240, 280, 360], 'https://www.corsair.com/us/en/p/pc-cases/cc-9011200-ww/4000d-airflow-tempered-glass-mid-tower-atx-case-black-cc-9011200-ww', { color: '#eef0ec', fans: 2, frontRadiatorOnly: [360], note: 'Радиатор 360 мм ставится спереди и уменьшает место для GPU. Для верхнего 280 мм важна высота RAM.' }),
  pcCase('pop-air', 'Fractal Design', 'Pop Air RGB', 9900, ['ATX', 'mATX', 'Mini-ITX'], 405, 170, 170, [120, 240, 280], 'https://www.fractal-design.com/products/cases/pop-series/pop-air/pop-air-rgb-black-tg-clear-tint/', { fans: 3, color: '#212722', frontRadiatorOnly: [280] }),
  pcCase('pop-mini-air', 'Fractal Design', 'Pop Mini Air RGB', 8900, ['mATX', 'Mini-ITX'], 365, 170, 150, [120, 240], 'https://www.fractal-design.com/products/cases/pop-series/pop-mini-air/pop-mini-air-rgb-black-tg-clear-tint/', { fans: 3, color: '#f0f0eb', tag: 'Компактный' }),
  pcCase('lancool-216', 'Lian Li', 'LANCOOL 216 RGB', 12900, ['ATX', 'mATX', 'Mini-ITX'], 392, 180.5, 220, [120, 140, 240, 280, 360], 'https://lian-li.com/product/lancool-216/', { fans: 3, color: '#e9edeb', tag: 'Свободное дыхание', note: 'Для СЖО сверху используется нижнее положение материнской платы; зазор радиатор+вентиляторы — 63 мм.' }),
  pcCase('prime-ap201', 'ASUS', 'Prime AP201', 7900, ['mATX', 'Mini-ITX'], 338, 170, 180, [120, 140, 240, 280, 360], 'https://www.asus.com/motherboards-components/cases/prime/asus-prime-ap201-microatx-case/techspec/', { fans: 1, color: '#eceee9', note: 'Положение БП и кабели могут ограничивать место длинной видеокарты; максимумы производителя не гарантируют одновременную установку.' }),
];

products.push(...extraPlatformProducts, ...extraHardwareProducts);

for (const product of products) {
  product.sourceCheckedAt ??= catalogMeta.updatedAt;
  product.sourceVerification ??= product.category === 'ram' && product.sourceUrl.includes('/memory/gaming/')
    ? 'manufacturer-series-specification' : 'manufacturer-product-specification';
}

export const productById = Object.fromEntries(products.map((product) => [product.id, product]));
export const categoriesById = Object.fromEntries(categories.map((category) => [category.id, category]));

export const presets = [
  { id: 'budget', name: 'Первый серьёзный', badge: '1080p', description: 'Доступная игровая сборка на AM4. Все деньги — в дело.', build: {
    cpu: 'ryzen-5600x', gpu: 'rx-7600', motherboard: 'b550m-pro', ram: 'beast-ddr4-16', storage: 'nv3-500', cooler: 'assassin-x-120', psu: 'mag-a650bn', case: 'pop-mini-air',
  } },
  { id: 'balanced', name: 'Золотая середина', badge: '1440p', description: 'Ryzen 5, RTX 4070 SUPER и 32 ГБ памяти. Сборка с характером.', build: {
    cpu: 'ryzen-7600', gpu: 'rtx-4070-super', motherboard: 'b650-gaming-plus', ram: 'beast-ddr5-32', storage: 'kc3000-1tb', cooler: 'peerless-assassin', psu: 'mag-a750gl', case: '4000d-airflow',
  } },
  { id: 'enthusiast', name: 'Можно всё', badge: '4K / ULTRA', description: '7800X3D, RTX 4090 и охлаждение 360 мм. Бюджет вышел из чата.', build: {
    cpu: 'ryzen-7800x3d', gpu: 'rtx-4090', motherboard: 'b650-gaming-plus', ram: 'beast-ddr5-32', storage: 'kc3000-2tb', cooler: 'liquid-freezer-360', psu: 'rm1000x', case: 'lancool-216',
  } },
  { id: 'creator', name: 'Рабочая станция', badge: 'CREATE', description: '16 ядер, 64 ГБ RAM, 16 ГБ VRAM и большой SSD для проектов.', build: {
    cpu: 'ryzen-7950x', gpu: 'rtx-4080-super', motherboard: 'b650-gaming-plus', ram: 'beast-ddr5-64', storage: 'kc3000-4tb', cooler: 'liquid-freezer-360', psu: 'mag-a850gl', case: 'lancool-216',
  } },
  { id: 'goodog', name: 'Goodog Edition', badge: 'ЗНАКОМОЕ ЖЕЛЕЗО', description: 'Твои i5-12400F, RTX 3060 12 ГБ и 16 ГБ DDR4. Остальное подобрано для симулятора.', build: {
    cpu: 'i5-12400f', gpu: 'rtx-3060', motherboard: 'b760m-ds3h', ram: 'beast-ddr4-16', storage: 'kc3000-1tb', cooler: 'assassin-x-120', psu: 'rm750x', case: 'prime-ap201',
  } },
];
