/** Validated, portable user-created hardware. No manufacturer claims are implied. */
export const customCategoryIds = ['cpu', 'motherboard', 'ram', 'gpu', 'storage', 'cooler', 'psu', 'case'];
/** Local record identity, including ordinary HTTP development servers. */
export function createLocalId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
  const bytes=new Uint8Array(16);
  if(typeof globalThis.crypto?.getRandomValues==='function')globalThis.crypto.getRandomValues(bytes);
  else for(let i=0;i<bytes.length;i++)bytes[i]=Math.floor(Math.random()*256);
  bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
  const h=[...bytes].map(n=>n.toString(16).padStart(2,'0')).join('');
  return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}
const field = (key, label, type = 'number', options = {}) => ({ key, label, type, ...options });

export const customFields = {
  cpu: [
    field('socket','Сокет','text',{default:'AM5',placeholder:'AM5 / AM4 / LGA1700'}),
    field('memoryTypes','Типы памяти','csv',{default:'DDR5',placeholder:'DDR4, DDR5'}),
    field('cores','Количество ядер','number',{min:1,max:256,default:8}),
    field('threads','Количество потоков','number',{min:1,max:512,default:16}),
    field('baseClock','Базовая частота, ГГц','number',{min:.1,max:15,step:.1,default:3.5}),
    field('boostClock','Boost-частота, ГГц','number',{min:.1,max:20,step:.1,default:5}),
    field('tdp','TDP, Вт','number',{min:5,max:1500,default:65}),
    field('peakPower','Пиковое потребление, Вт','number',{min:5,max:3000,default:90}),
    field('score','Условный игровой индекс','number',{min:1,max:500,default:100,hint:'100 = Ryzen 7 7800X3D в модели игры'}),
    field('hasIntegratedGraphics','Есть встроенная графика','checkbox',{default:true}),
  ],
  motherboard: [
    field('socket','Сокет','text',{default:'AM5',placeholder:'AM5 / AM4 / LGA1700'}),
    field('memoryType','Тип памяти','select',{options:['DDR3','DDR4','DDR5'],default:'DDR5'}),
    field('formFactor','Форм-фактор','select',{options:['ATX','mATX','Mini-ITX','E-ATX'],default:'ATX'}),
    field('memorySlots','Слоты памяти','number',{min:1,max:16,default:4}),
    field('maxMemory','Макс. объём памяти, ГБ','number',{min:1,max:4096,default:128}),
    field('m2Slots','Разъёмы M.2 NVMe','number',{min:0,max:16,default:3}),
  ],
  ram: [
    field('memoryType','Тип памяти','select',{options:['DDR3','DDR4','DDR5'],default:'DDR5'}),
    field('capacity','Общий объём комплекта, ГБ','number',{min:1,max:4096,default:32}),
    field('modules','Модулей в комплекте','number',{min:1,max:16,default:2}),
    field('speed','Скорость, MT/s','number',{min:800,max:16000,default:6000}),
    field('height','Высота модуля, мм','number',{step:.01,min:10,max:200,default:35}),
  ],
  gpu: [
    field('vram','Видеопамять, ГБ','number',{min:1,max:1024,default:16}),
    field('power','Потребление, Вт','number',{min:5,max:3000,default:250}),
    field('recommendedPsu','Рекомендуемый БП, Вт','number',{min:150,max:5000,default:750}),
    field('length','Длина видеокарты, мм','number',{step:.01,min:50,max:700,default:290}),
    field('slots','Занимаемые слоты','number',{min:1,max:6,step:.5,default:2.5}),
    field('powerConnector','Разъём питания','select',{options:['Без дополнительного питания','8-pin','2×8-pin','3×8-pin','12VHPWR','12V-2x6'],default:'12VHPWR'}),
    field('adapterPcie8','8-pin для адаптера 16-pin','number',{min:0,max:6,default:2,hint:'Игнорируется при родном 16-pin кабеле БП'}),
    field('score','Условный игровой индекс','number',{min:1,max:1000,default:100,hint:'100 = RTX 4070 SUPER в модели игры'}),
  ],
  storage: [
    field('capacity','Объём накопителя, ГБ','number',{min:64,max:65536,default:1000}),
    field('interface','Интерфейс','select',{options:['NVMe'],default:'NVMe'}),
    field('power','Потребление, Вт','number',{min:1,max:100,default:7}),
  ],
  cooler: [
    field('kind','Тип охлаждения','select',{options:[['air','Воздушное'],['aio','Жидкостное (AIO)']],default:'air'}),
    field('sockets','Поддерживаемые сокеты','csv',{default:'AM4, AM5, LGA1700',placeholder:'AM4, AM5, LGA1700'}),
    field('height','Высота воздушного кулера, мм','number',{step:.01,min:20,max:350,default:155,hint:'Для СЖО не используется'}),
    field('radiator','Размер радиатора СЖО, мм','select',{options:[120,240,280,360,420],default:240,hint:'Для воздушного кулера не используется'}),
    field('coolingCapacity','Условный предел охлаждения, Вт','number',{min:20,max:1500,default:220,hint:'Параметр учебной тепловой модели'}),
    field('maxRamHeight','Зазор для RAM, мм','number',{step:.01,min:20,max:200,default:45}),
  ],
  psu: [
    field('watts','Мощность, Вт','number',{min:150,max:5000,default:750}),
    field('formFactor','Форм-фактор','select',{options:['ATX','SFX','SFX-L'],default:'ATX'}),
    field('length','Длина блока питания, мм','number',{step:.01,min:80,max:400,default:150}),
    field('pcie8','Разъёмы PCIe 8-pin','number',{min:0,max:16,default:4}),
    field('eps8','Разъёмы CPU EPS 8-pin','number',{min:0,max:8,default:2}),
    field('native12VHPWR','Родной 16-pin кабель (12VHPWR / 12V-2x6)','checkbox',{default:true}),
  ],
  case: [
    field('supportedFormFactors','Форматы материнских плат','csv',{default:'ATX, mATX, Mini-ITX',placeholder:'ATX, mATX, Mini-ITX'}),
    field('supportedPsuFormFactors','Форматы блоков питания','csv',{default:'ATX',placeholder:'ATX, SFX'}),
    field('maxGpuLength','Макс. длина GPU, мм','number',{step:.01,min:50,max:750,default:360}),
    field('maxCoolerHeight','Макс. высота кулера, мм','number',{step:.01,min:30,max:350,default:170}),
    field('maxPsuLength','Макс. длина БП, мм','number',{step:.01,min:80,max:500,default:200}),
    field('radiatorSupport','Радиаторы СЖО, мм','csv-number',{default:'120, 240, 280, 360',optional:true,hint:'Через запятую. Пусто = нет места для СЖО'}),
  ],
};

const string = (value, max, label, required = true) => {
  const result = String(value ?? '').trim();
  if (required && !result) throw new Error(`Заполни поле «${label}».`);
  if (result.length > max) throw new Error(`Поле «${label}» не длиннее ${max} символов.`);
  return result;
};

export function customDefaults(category, product = {}) {
  const values = { category, brand: 'Goodog Labs', name: '', price: 10000, sourceUrl: '', ...product };
  for (const f of customFields[category] || []) {
    if (values[f.key] === undefined || values[f.key] === null) values[f.key] = f.default;
    if (category === 'psu' && ['pcie8','eps8','native12VHPWR'].includes(f.key)) values[f.key] = product.connectors?.[f.key] ?? f.default;
  }
  return values;
}

export function normalizeCustomProduct(input, { generateId = () => `custom-${createLocalId()}` } = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Неверный формат пользовательского компонента.');
  const category = input.category;
  if (!customCategoryIds.includes(category)) throw new Error('Неизвестная категория компонента.');
  const id = input.id || generateId();
  if (typeof id !== 'string' || !/^custom-[a-z0-9-]{6,80}$/i.test(id)) throw new Error('Некорректный идентификатор пользовательского компонента.');
  const price = Number(input.price);
  if (!Number.isFinite(price) || price < 0 || price > 10000000) throw new Error('Цена должна быть от 0 до 10 000 000 ₽.');
  const result = {
    id, category, custom: true,
    brand: string(input.brand, 40, 'Производитель'),
    name: string(input.name, 100, 'Название'),
    price: Math.round(price),
    revision: Math.max(1, Math.min(Number(input.revision) || 1, 1000000)),
    sourceUrl: string(input.sourceUrl, 500, 'Источник', false),
    sourceVerification: 'user-defined',
    note: 'Пользовательский компонент. Характеристики заданы автором и не проверены производителем.',
  };
  if (result.sourceUrl) {
    let url;
    try { url = new URL(result.sourceUrl); } catch { throw new Error('Укажи корректную HTTPS-ссылку на источник или оставь поле пустым.'); }
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Источник должен быть обычной HTTPS-ссылкой.');
  }
  for (const f of customFields[category]) {
    if (category === 'cooler' && ((f.key === 'height' && input.kind === 'aio') || (f.key === 'radiator' && input.kind === 'air'))) {
      result[f.key] = null;
      continue;
    }
    let raw = input[f.key];
    if (category === 'psu' && ['pcie8','eps8','native12VHPWR'].includes(f.key)) raw = input.connectors?.[f.key] ?? raw;
    if (f.type === 'checkbox') {
      result[f.key] = raw === true || raw === 'on' || raw === 'true';
    } else if (f.type === 'number') {
      const value = Number(raw);
      if (raw === '' || raw === null || raw === undefined || !Number.isFinite(value) || value < f.min || value > f.max) throw new Error(`«${f.label}»: допустимо от ${f.min} до ${f.max}.`);
      if ((!f.step || f.step === 1) && !Number.isInteger(value)) throw new Error(`«${f.label}»: укажи целое число.`);
      result[f.key] = value;
    } else if (f.type === 'select') {
      const options = f.options.map(o=>String(Array.isArray(o)?o[0]:o));
      if (!options.includes(String(raw))) throw new Error(`Выбери значение «${f.label}».`);
      result[f.key] = f.key === 'radiator' ? Number(raw) : String(raw);
    } else if (f.type.startsWith('csv')) {
      const items = Array.isArray(raw) ? raw : String(raw ?? '').split(',');
      const values = [...new Set(items.map(v=>String(v).trim()).filter(Boolean))];
      if (!f.optional && !values.length) throw new Error(`Заполни поле «${f.label}».`);
      if (values.length > 16 || values.some(v=>v.length>40)) throw new Error(`Слишком много значений в поле «${f.label}».`);
      result[f.key] = f.type === 'csv-number' ? values.map(v=>{
        const n=Number(v); if (![120,140,240,280,360,420,480].includes(n)) throw new Error('Размеры радиаторов: 120, 140, 240, 280, 360, 420 или 480 мм.'); return n;
      }) : values;
    } else result[f.key] = string(raw, 40, f.label);
  }
  if (category === 'cpu') {
    if (result.threads < result.cores) throw new Error('Потоков не может быть меньше, чем ядер.');
    result.memoryTypes = result.memoryTypes.map(v=>v.toUpperCase());
    if (result.memoryTypes.some(v=>!['DDR3','DDR4','DDR5'].includes(v))) throw new Error('Типы памяти: DDR3, DDR4 или DDR5.');
  }
  if (category === 'psu') {
    result.connectors = { pcie8:result.pcie8, eps8:result.eps8, native12VHPWR:result.native12VHPWR };
    delete result.pcie8; delete result.eps8; delete result.native12VHPWR;
  }
  if (category === 'cooler') { if(result.kind==='aio')result.height=null; else result.radiator=null; }
  result.specs = describeCustom(result);
  return result;
}

export function describeCustom(p) {
  switch (p.category) {
    case 'cpu': return [`${p.cores} ядер / ${p.threads} потоков`, `${p.socket} · до ${p.boostClock} ГГц`, `TDP ${p.tdp} Вт · пик ${p.peakPower} Вт`, p.memoryTypes.join(' / ')];
    case 'motherboard': return [`${p.socket} · ${p.formFactor}`, `${p.memoryType} · ${p.memorySlots} DIMM`, `До ${p.maxMemory} ГБ · ${p.m2Slots} M.2`];
    case 'ram': return [`${p.capacity} ГБ (${p.modules} модуля)`, `${p.memoryType}-${p.speed}`, `Высота ${p.height} мм`];
    case 'gpu': return [`${p.vram} ГБ VRAM`, `${p.power} Вт · ${p.length} мм`, `${p.slots} слота · ${p.powerConnector}`];
    case 'storage': return [`${p.capacity} ГБ · M.2 ${p.interface}`, `${p.power} Вт`];
    case 'cooler': return [p.kind==='aio'?`СЖО ${p.radiator} мм`:`Воздушное · ${p.height} мм`, p.sockets.join(' / '), `Модель охлаждения: ${p.coolingCapacity} Вт`];
    case 'psu': return [`${p.watts} Вт · ${p.formFactor}`, `Длина ${p.length} мм`, `${p.connectors.pcie8} × PCIe 8-pin${p.connectors.native12VHPWR?' · 16-pin':''}`];
    case 'case': return [p.supportedFormFactors.join(' / '), `GPU до ${p.maxGpuLength} мм`, `Кулер до ${p.maxCoolerHeight} мм`];
    default: return [];
  }
}

export function normalizeCustomBatch(items) {
  if (!Array.isArray(items) || items.length > 200) throw new Error('Некорректный каталог пользовательских компонентов (максимум 200).');
  const result = items.map(p=>normalizeCustomProduct(p));
  if (new Set(result.map(p=>p.id)).size !== result.length) throw new Error('Повторяющиеся идентификаторы пользовательских компонентов.');
  return result;
}
