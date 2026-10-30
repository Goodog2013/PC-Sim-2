import './style.css';
import { products as officialProducts, presets, productById as officialById } from './catalog.js';
import { PCScene } from './scene.js';
import { evaluateBuild, candidateStatus, estimateBenchmark, validateBoot, getInstallBlockers, installationOrder, categoryLabels, benchmarkGames } from './engine.js';
import { icon, componentArt, escapeHtml as esc, money, number } from './ui.js';
import { customFields, customDefaults, normalizeCustomProduct, normalizeCustomBatch, createLocalId } from './custom-components.js';

const STORAGE = 'pc-lab:workspace:v1';
const SAVES = 'pc-lab:builds:v1';
const CUSTOM = 'pc-lab:custom:v1';
let customProducts = [];
let products = [...officialProducts];
let productById = { ...officialById };
const categoryOrder = ['cpu', 'motherboard', 'ram', 'gpu', 'storage', 'cooler', 'psu', 'case'];
const installLabels={case:'корпус',psu:'блок питания',motherboard:'материнскую плату',cpu:'процессор',ram:'оперативную память',storage:'SSD',cooler:'охлаждение',gpu:'видеокарту'};
const installedMessages={case:'Корпус установлен.',psu:'Блок питания установлен.',motherboard:'Материнская плата установлена.',cpu:'Процессор установлен.',ram:'Оперативная память установлена.',storage:'Накопитель установлен.',cooler:'Охлаждение установлено.',gpu:'Видеокарта установлена.'};
const shortLabels = { cpu: 'Процессор', motherboard: 'Плата', ram: 'Память', gpu: 'Видеокарта', storage: 'SSD', cooler: 'Охлаждение', psu: 'Блок питания', case: 'Корпус' };
const defaultPreset = presets.find(p => p.id === 'balanced') || presets[0];
const initial = { name: 'Мой следующий ПК', ids: { ...defaultPreset.build }, installed: [...installationOrder], thermalPaste: true, cablesConnected: true, manual: false, budget: 170000 };
let persistenceAvailable = true;
let initialNotice = '';
let importedFromLink = false;

function validateSnapshot(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Неверный формат сборки.');
  const source = value.ids || value.build || value.p;
  if (!source || typeof source !== 'object' || Array.isArray(source)) throw new Error('В файле нет списка комплектующих.');
  const customComponents = normalizeCustomBatch(value.customComponents || value.c || []);
  const available = { ...productById, ...Object.fromEntries(customComponents.map(p=>[p.id,p])) };
  const ids = {};
  for (const key of categoryOrder) {
    if (!source[key]) continue;
    const product = available[source[key]];
    if (!product || product.category !== key) throw new Error(`Неизвестный компонент: ${String(source[key]).slice(0, 80)}`);
    ids[key] = product.id;
  }
  const manual = value.manual === true;
  return {
    name: String(value.name || value.n || 'Моя сборка').slice(0, 64), ids, customComponents,
    installed: manual && Array.isArray(value.installed) ? [...new Set(value.installed.filter(c => ids[c]))] : Object.keys(ids),
    thermalPaste: manual ? value.thermalPaste === true : true,
    cablesConnected: manual ? value.cablesConnected === true : true, manual,
    budget: Math.max(10000, Math.min(2000000, Number(value.budget || value.b) || 170000)),
  };
}

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}

function refreshCatalog() {
  products = [...officialProducts, ...customProducts];
  productById = Object.fromEntries(products.map(p=>[p.id,p]));
}

function mergeCustom(items, persistCatalog = true) {
  const normalized = normalizeCustomBatch(items);
  const combined = new Map(customProducts.map(p=>[p.id,p]));
  normalized.forEach(p=>combined.set(p.id,p));
  if(combined.size>200)throw new Error('В пользовательском каталоге уже 200 компонентов. Удали ненужные.');
  customProducts = [...combined.values()];
  refreshCatalog();
  if(persistCatalog)saveCustomCatalog();
}

function saveCustomCatalog() {
  try {localStorage.setItem(CUSTOM,JSON.stringify(customProducts));}
  catch {toast('Не удалось сохранить свой каталог. Экспорт сборки сохранит выбранные детали.','warning');}
}

try {customProducts=normalizeCustomBatch(readJson(CUSTOM,[]));refreshCatalog();}
catch {initialNotice='Некоторые пользовательские детали не удалось загрузить. Их можно восстановить из экспорта сборки.';}

let starting = initial;
try { const cached = readJson(STORAGE, null); if (cached) starting = validateSnapshot(cached); } catch { initialNotice = 'Сохранённая сборка устарела. Загружен проверенный пресет.'; }
if (location.hash.startsWith('#build=')) {
  try {
    const data = location.hash.slice(7);
    if (data.length > 80000) throw new Error('Ссылка слишком длинная.');
    const bytes = Uint8Array.from(atob(data.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    starting = validateSnapshot(JSON.parse(new TextDecoder().decode(bytes)));
    initialNotice = 'Сборка по ссылке загружена. Можно экспериментировать!';
    importedFromLink = true;
  } catch { initialNotice = 'Не удалось прочитать сборку по ссылке. Открыта твоя мастерская.'; }
}
try {if(starting.customComponents?.length)mergeCustom(starting.customComponents,false);}
catch {starting=initial;importedFromLink=false;initialNotice='Не удалось объединить пользовательские каталоги. Открыта базовая сборка.';}

const state = { ...starting, category: 'cpu', search: '', brand: 'all', sort: 'popular', compatibleOnly: true, powered: false, exploded: false, labels: false, glass: false, rgb: '#b5ef78', compare: [], favorites: new Set(), resolution: '1440p', quality: 'high', benchResults: null };
let scene;
let activeModal = null;
let previousFocus = null;
let bootToken = 0;
let editorProduct = null;
let editorExistingId = null;
const undoStack = [];
const redoStack = [];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const toBuild = () => Object.fromEntries(Object.entries(state.ids).filter(([, id]) => productById[id]).map(([key, id]) => [key, productById[id]]));
const snapshot = () => ({ name: state.name, ids: { ...state.ids }, installed: [...state.installed], thermalPaste: state.thermalPaste, cablesConnected: state.cablesConnected, manual: state.manual, budget: state.budget, customComponents: Object.values(state.ids).map(id=>productById[id]).filter(p=>p?.custom) });

function persist() {
  try { localStorage.setItem(STORAGE, JSON.stringify(snapshot())); }
  catch { if (persistenceAvailable) toast('Автосохранение недоступно. Сохрани сборку через экспорт JSON.', 'warning'); persistenceAvailable = false; }
}

function mutate(fn, message) {
  undoStack.push(snapshot());
  if (undoStack.length > 40) undoStack.shift();
  redoStack.length = 0;
  fn();
  state.powered = false;
  state.benchResults = null;
  persist();
  render();
  if (message) toast(message);
}

function restore(value) {
  const checked=validateSnapshot(value);
  mergeCustom(checked.customComponents);
  Object.assign(state, checked, { powered: false, benchResults: null });
}
function toast(message, type = 'success') {
  const item = document.createElement('div');
  item.className = `toast ${type}`;
  item.innerHTML = `${icon(type === 'warning' ? 'warning' : 'check', 18)}<span>${esc(message)}</span>`;
  $('#toasts').append(item);
  setTimeout(() => { item.classList.add('leaving'); setTimeout(() => item.remove(), 250); }, 4000);
}

$('#app').innerHTML = `
  <header class="topbar">
    <a href="#" class="brand" aria-label="PC Lab — мастерская" data-action="home"><span class="brand-mark">${icon('case', 24)}</span><span>pc<span class="brand-light">lab</span><span class="brand-period">.</span></span><span class="brand-version">SIMULATOR 02</span></a>
    <nav class="main-nav" aria-label="Основная навигация">
      <button class="nav-link active" data-action="home">${icon('case', 16)}<span>Мастерская</span></button>
      <button class="nav-link" data-action="presets">${icon('explode', 16)}<span>Готовые сборки</span></button>
      <button class="nav-link" data-action="saved">${icon('folder', 16)}<span>Мои сборки</span></button>
      <button class="nav-link" data-action="custom-library">${icon('cpu', 16)}<span>Свои детали</span></button>
    </nav>
    <div class="header-actions"><button class="icon-button help-button" data-action="help" aria-label="Как пользоваться" title="Как пользоваться">${icon('help')}</button><button class="button button-dark button-small" data-action="save">${icon('save',16)}<span>Сохранить</span></button><span class="profile-avatar" title="Мастерская Goodog">G<span></span></span></div>
  </header>
  <main>
    <section class="workspace-heading">
      <div><div class="eyebrow"><span class="live-dot"></span> ТВОЯ ВИРТУАЛЬНАЯ МАСТЕРСКАЯ</div><h1>Большие идеи. <span>Мощные сборки.</span></h1><p>От первого винтика до первого запуска. Всё в твоих руках.</p></div>
      <div class="heading-actions"><button class="button button-plain" data-action="new">${icon('plus',17)} Новая сборка</button><button class="button button-outline" data-action="benchmark">${icon('benchmark',17)} Лаборатория ${icon('external',15)}</button></div>
    </section>
    <div class="lab-layout">
      <aside class="catalog-panel panel" id="catalog" aria-label="Каталог комплектующих"></aside>
      <section class="stage-column" aria-label="Виртуальная сборка">
        <div class="project-bar"><button class="project-name" data-action="rename"><span id="project-title"></span>${icon('edit',13)}</button><div class="project-tools"><button class="icon-button" data-action="undo" id="undo-button" title="Отменить (Ctrl+Z)" aria-label="Отменить изменение">${icon('undo',17)}</button><button class="icon-button" data-action="redo" id="redo-button" title="Повторить (Ctrl+Shift+Z)" aria-label="Повторить изменение">${icon('redo',17)}</button><span class="tool-divider"></span><button class="icon-button" data-action="share" title="Поделиться сборкой" aria-label="Поделиться сборкой">${icon('link',17)}</button></div></div>
        <div class="scene-stage" id="stage">
          <div class="scene-badges"><span class="scene-label"><span class="live-dot"></span> LIVE 3D</span><button class="scene-view-label" data-action="scene-info">Открытый корпус ${icon('chevron',12)}</button></div>
          <div id="scene-container" aria-label="3D модель компьютера. Перетаскивай мышью для вращения, используй колесо для масштаба."></div>
          <div class="scene-selection" id="scene-selection"></div>
          <div class="scene-watermark">BUILD.<br>PLAY.<br>REPEAT.</div>
          <div class="scene-hint">${icon('mouse',13)} Потяни, чтобы вращать <span>·</span> Скролл — масштаб</div>
          <button class="scene-capture icon-button" data-action="capture" aria-label="Скачать снимок сборки" title="Снимок сборки">${icon('image',18)}</button>
          <div class="scene-toolbar" role="toolbar" aria-label="Управление 3D видом">
            <button class="icon-button" data-action="reset-view" aria-label="Сбросить ракурс" title="Сбросить ракурс">${icon('reset',19)}</button><span class="tool-divider"></span>
            <button class="icon-button" id="explode-button" data-action="explode" aria-label="Разнесённый вид" title="Разнесённый вид">${icon('explode',19)}</button>
            <button class="icon-button" id="labels-button" data-action="labels" aria-label="Подписи компонентов" title="Подписи компонентов">${icon('labels',19)}</button>
            <button class="icon-button" id="glass-button" data-action="glass" aria-label="Боковая панель" title="Боковая панель">${icon('glass',19)}</button><span class="tool-divider"></span>
            <button class="rgb-button" data-action="rgb" title="Цвет подсветки" aria-label="Цвет подсветки"><span></span></button>
          </div>
          <div class="rgb-palette" id="rgb-palette" hidden>${['#b5ef78','#79d5ff','#c79cff','#ff8ab3','#ffb65e','#f0f7ff'].map(color=>`<button data-action="set-rgb" data-color="${color}" style="--swatch:${color}" aria-label="Цвет ${color}"></button>`).join('')}</div>
        </div>
        <div id="stage-bottom"></div>
      </section>
      <aside class="build-panel panel" id="build-panel" aria-label="Твоя сборка"></aside>
    </div>
    <section class="bottom-strip"><div><span class="status-led"></span><span id="save-status">Изменения сохраняются автоматически</span></div><button data-action="data-info">Реальные модели. Виртуальные эксперименты. ${icon('external',13)}</button><a href="https://github.com/Goodog2013/PC-Sim-2" target="_blank" rel="noopener noreferrer">GOODOG / PC-SIM-2 ${icon('external',13)}</a></section>
  </main>
  <input type="file" id="import-file" accept="application/json,.json" hidden />
`;

function renderCatalog() {
  $('#catalog').innerHTML = `<div class="panel-heading"><h2>Комплектующие</h2><span class="count-badge">${products.length}</span></div>
    <div class="catalog-search">${icon('search',17)}<input id="catalog-search" placeholder="Найти компонент…" value="${esc(state.search)}" aria-label="Поиск комплектующих" autocomplete="off"><kbd>/</kbd></div>
    <div class="category-grid" role="tablist" aria-label="Тип компонента">${categoryOrder.map(id=>`<button class="category-button ${state.category===id?'active':''}" data-action="category" data-category="${id}" role="tab" aria-selected="${state.category===id}" title="${esc(categoryLabels[id])}">${icon(id,21)}<span>${shortLabels[id]}</span></button>`).join('')}</div>
    <div class="catalog-filter"><label class="switch-label"><input id="compatible-filter" type="checkbox" ${state.compatibleOnly?'checked':''}><span class="switch"></span> Только совместимые</label><button class="icon-button small" data-action="filters" title="Бренд и сортировка" aria-label="Бренд и сортировка">${icon('filters',17)}</button></div>
    <div class="catalog-subheading"><span>${categoryLabels[state.category]}</span><span id="results-count"></span></div>
    <div class="product-list" id="product-list" role="tabpanel" aria-label="${esc(categoryLabels[state.category])}"></div>
    <button class="create-component-button" data-action="create-custom">${icon('plus',16)} Создать свой компонент ${icon('external',13)}</button>
    <button class="catalog-bottom" data-action="compare">${icon('compare',16)} Сравнить компоненты <span id="compare-count">${state.compare.length}</span></button>`;
  renderProducts();
}

function renderProducts() {
  const build = toBuild();
  const query = state.search.toLowerCase().trim();
  let matches = products.filter(p => (query || p.category === state.category) && (state.brand === 'all' || p.brand === state.brand));
  if (query) matches = matches.filter(p => `${p.name} ${p.brand} ${p.specs.join(' ')}`.toLowerCase().includes(query));
  matches = matches.map(p=>({ product:p, status:candidateStatus(build,p) })).filter(({status})=>!state.compatibleOnly||status.compatible);
  if (state.sort === 'price-asc') matches.sort((a,b)=>a.product.price-b.product.price);
  if (state.sort === 'price-desc') matches.sort((a,b)=>b.product.price-a.product.price);
  if (state.sort === 'name') matches.sort((a,b)=>a.product.name.localeCompare(b.product.name));
  const count=matches.length;
  $('#results-count').textContent = `${count} ${count%10===1&&count%100!==11?'модель':count%10>=2&&count%10<=4&&(count%100<12||count%100>14)?'модели':'моделей'}`;
  $('.catalog-subheading > span').textContent=query?'Поиск по всему каталогу':categoryLabels[state.category];
  const list = $('#product-list');
  const scroll = list.scrollTop;
  list.innerHTML = matches.length ? matches.map(({product:p,status})=>{
    const selected = state.ids[p.category] === p.id;
    return `<article class="product-card ${selected?'selected':''} ${!status.compatible?'incompatible':''}"><button class="product-main" data-action="product" data-id="${p.id}" aria-label="Подробнее о ${esc(p.name)}"><div class="product-image">${componentArt(p)}<span class="product-brand">${esc(p.brand)}${p.custom?' / CUSTOM':''}</span>${selected?`<span class="selected-marker">${icon('check',11)}</span>`:''}</div><div class="product-copy"><span class="product-name">${esc(p.name)}</span><span class="product-specs">${esc(p.specs.slice(0,2).join(' · '))}</span></div></button><div class="product-bottom"><span class="product-price">${money(p.price)}<span>${!status.compatible?'Конфликт сборки':selected?'В твоей сборке':'Цена в симуляторе'}</span></span><button class="add-button ${selected?'added':''}" data-action="add" data-id="${p.id}" aria-label="${selected?'Установлено':'Добавить'} ${esc(p.name)}" title="${selected?'В сборке':'Добавить в сборку'}">${icon(selected?'check':'plus',18)}</button></div></article>`;
  }).join('') : `<div class="empty-state compact">${icon('search',30)}<h3>Ничего не нашлось</h3><p>Попробуй другой запрос или отключи фильтр совместимости.</p><button class="button button-outline button-small" data-action="reset-filters">Сбросить фильтры</button></div>`;
  list.scrollTop = scroll;
}

function nextAssemblyStep() {
  const build = toBuild();
  for (const category of installationOrder) {
    if (category === 'cooler' && state.installed.includes('cpu') && !state.thermalPaste) return 'paste';
    if (build[category] && !state.installed.includes(category)) return category;
  }
  if (!state.cablesConnected && state.installed.length >= 6) return 'cables';
  return null;
}

function renderBuild() {
  const build = toBuild();
  const evaluation = evaluateBuild(build);
  const count = state.installed.filter(id=>state.ids[id]).length;
  const hasErrors = evaluation.errors.length > 0;
  const overBudget = evaluation.totalPrice > state.budget;
  $('#project-title').textContent = state.name;
  $('#undo-button').disabled = undoStack.length === 0;
  $('#redo-button').disabled = redoStack.length === 0;
  $('#build-panel').innerHTML = `<div class="panel-heading"><h2>Твоя сборка</h2><span class="build-count">${evaluation.selectedCount}<span> / 8</span></span></div>
    <button class="compatibility-banner ${hasErrors?'has-errors':!evaluation.complete?'in-progress':''}" data-action="compatibility">${icon(hasErrors?'warning':evaluation.complete?'success':'square',17)}<span>${hasErrors?`${evaluation.errors.length} ${evaluation.errors.length===1?'конфликт':'конфликта'}`:evaluation.complete?(evaluation.warnings.length?'Совместимо · есть замечания':'Всё совместимо'):'Сборка в процессе'}</span>${icon('next',15)}</button>
    <div class="build-components">${(state.manual?installationOrder:categoryOrder).map(category=>{
      const p = build[category];
      const installed = state.installed.includes(category);
      const error = evaluation.errors.some(i=>i.categories.includes(category));
      return `<div class="build-row ${!p?'empty':''} ${error?'error':''} ${state.category===category?'focused':''}"><button class="build-component" data-action="category" data-category="${category}"><span class="build-row-icon">${icon(category,18)}</span><span class="build-row-copy"><span class="build-row-label">${categoryLabels[category]}${state.manual&&p?` <span class="assembly-dot ${installed?'installed':''}"></span>`:''}</span><strong title="${p?esc(p.name):''}">${p?esc(p.name):'Выбрать компонент'}</strong></span></button>${p?`<div class="build-row-actions">${state.manual&&!installed?`<button class="mini-button install-button" data-action="install" data-category="${category}" title="Установить ${esc(p.name)}" aria-label="Установить ${esc(p.name)}">${icon('plus',14)}</button>`:''}<button class="mini-button remove-button" data-action="remove" data-category="${category}" aria-label="Убрать ${esc(p.name)}" title="Убрать компонент">${icon('x',13)}</button></div>`:`<button class="mini-button" data-action="category" data-category="${category}" aria-label="Выбрать ${categoryLabels[category]}">${icon('plus',15)}</button>`}</div>`;
    }).join('')}</div>
    <div class="assembly-control"><div><span>${icon('settings',15)} Ручная сборка</span><button class="toggle ${state.manual?'on':''}" data-action="toggle-mode" role="switch" aria-checked="${state.manual}" aria-label="Ручная сборка"><span></span></button></div><p>${state.manual?`Установлено ${count} из ${evaluation.selectedCount} · Собирай по шагам`:'Меняй детали одним кликом'}</p>${state.manual?`<div class="prep-actions"><button data-action="paste" class="${state.thermalPaste?'done':''}">${icon(state.thermalPaste?'check':'paste',13)} Термопаста</button><button data-action="cables" class="${state.cablesConnected?'done':''}">${icon(state.cablesConnected?'check':'cables',13)} Кабели</button></div>`:''}</div>
    <div class="power-summary"><div><span>${icon('psu',14)} Пиковая нагрузка</span><strong>${evaluation.power.estimated} <small>Вт</small><span> / ${build.psu?.watts || '—'} Вт</span></strong></div><div class="meter-track"><span class="${evaluation.power.loadPercent>85?'warm':''}" style="width:${Math.min(evaluation.power.loadPercent,100)}%"></span></div><span class="meter-note">Расчётная оценка · рекомендуем ${evaluation.power.recommended||'—'} Вт</span></div>
    <div class="build-total"><div class="total-label"><span>Стоимость сборки</span><button data-action="budget" title="Изменить бюджет">Бюджет ${money(state.budget)} ${icon('edit',10)}</button></div><div class="total-price ${overBudget?'over-budget':''}">${money(evaluation.totalPrice)}<span>RUB</span></div><div class="budget-track"><span class="${overBudget?'over':''}" style="width:${Math.min(evaluation.totalPrice/state.budget*100,100)}%"></span></div><p>${overBudget?`Выше бюджета на ${money(evaluation.totalPrice-state.budget)}`:`Осталось в бюджете ${money(state.budget-evaluation.totalPrice)}`}<span>Ориентировочно</span></p></div>`;
  const boot = validateBoot(build,{ installed:state.installed,thermalPaste:state.thermalPaste,cablesConnected:state.cablesConnected });
  const next = state.manual ? nextAssemblyStep() : null;
  $('#stage-bottom').innerHTML = `${state.manual&&next?`<div class="next-step"><span class="step-number">${String(count+(state.thermalPaste?1:0)+(state.cablesConnected?1:0)+1).padStart(2,'0')}</span><span><small>СЛЕДУЮЩИЙ ШАГ</small><strong>${next==='paste'?'Нанеси термопасту':next==='cables'?'Подключи питание':`Установи ${installLabels[next]}`}</strong></span><button class="button button-small button-outline" data-action="install-next">${next==='paste'?'Нанести':next==='cables'?'Подключить':'Установить'} ${icon('arrow',15)}</button></div>`:''}
    <div class="boot-bar ${state.powered?'powered':''}"><div class="boot-status-icon">${icon('power',23)}</div><div class="boot-text"><strong>${state.powered?'Система запущена':boot.canBoot?'Момент истины. Готов к запуску?':'У каждого компьютера есть начало.'}</strong><span>${state.powered?'Вентиляторы крутятся. Пора проверить мощность.':boot.canBoot?'Все компоненты на месте. Остался один клик.':state.manual?'Установи детали и подключи питание.':'Выбери компоненты и проверь свою сборку.'}</span></div><button class="button button-lime" data-action="power">${icon('power',17)} ${state.powered?'Выключить':'Включить ПК'}</button></div>
    <div class="stage-stats"><div>${icon('cpu',16)}<span>Платформа<strong>${esc(build.cpu?.socket||'Не выбрана')}</strong></span></div><div>${icon('ram',16)}<span>Память<strong>${build.ram?`${build.ram.capacity} ГБ ${esc(build.ram.memoryType)}`:'—'}</strong></span></div><div>${icon('gpu',16)}<span>Видеопамять<strong>${build.gpu?`${build.gpu.vram} ГБ`:'—'}</strong></span></div><button data-action="benchmark"><span>Оценить FPS</span>${icon('external',16)}</button></div>`;
}

function render() {
  renderCatalog();
  renderBuild();
  if (scene) { scene.update(toBuild(), state.installed); scene.setPowered(state.powered); }
  for (const [name,value] of [['explode',state.exploded],['labels',state.labels],['glass',state.glass]]) { $(`#${name}-button`).classList.toggle('active',value); $(`#${name}-button`).setAttribute('aria-pressed',value); }
  $('#save-status').textContent = persistenceAvailable?'Изменения сохраняются автоматически':'Автосохранение недоступно — используй экспорт';
}

function openModal(title, body, { wide=false, className='' } = {}) {
  if (!activeModal) previousFocus = document.activeElement;
  activeModal = title;
  $('#modal-root').innerHTML = `<div class="modal-backdrop"><section class="modal ${wide?'modal-wide':''} ${className}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><span class="eyebrow">PC LAB / WORKSPACE</span><h2 id="modal-title">${esc(title)}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть окно">${icon('x',22)}</button></div><div class="modal-body">${body}</div></section></div>`;
  document.body.classList.add('modal-open');
  requestAnimationFrame(()=>$('.modal input:not([type=file]), .modal select, .modal button')?.focus());
}

function closeModal() {
  bootToken++;
  $('#modal-root').innerHTML = '';
  activeModal = null;
  document.body.classList.remove('modal-open');
  previousFocus?.isConnected && previousFocus.focus();
}

function addProduct(id, force = false) {
  const product = productById[id];
  if (!product || state.ids[product.category] === id) { toast('Этот компонент уже в твоей сборке.'); return; }
  const status = candidateStatus(toBuild(),product);
  if (!status.compatible && !force) { showProduct(id,true); return; }
  mutate(()=>{
    const category = product.category;
    state.ids[category] = id;
    state.category = category;
    if (!state.manual) { state.installed = Object.keys(state.ids); state.thermalPaste = true; state.cablesConnected = true; }
    else {
      state.installed = state.installed.filter(c=>c!==category);
      state.cablesConnected = false;
      if (category==='case') state.installed=[];
      if (category==='motherboard') state.installed=state.installed.filter(c=>['case','psu'].includes(c));
      if (category==='cpu'||category==='cooler') { state.thermalPaste=false; state.installed=state.installed.filter(c=>c!=='cooler'); }
    }
  },`${product.name} ${state.manual?'добавлен в комплект':'установлен'}`);
  closeModal();
  scene?.focus(product.category);
}

function removeProduct(category) {
  if (!state.ids[category]) return;
  mutate(()=>{
    delete state.ids[category];
    state.installed=state.installed.filter(c=>c!==category);
    if (state.manual) {
      state.cablesConnected=false;
      if (category==='case') state.installed=[];
      if (category==='motherboard') state.installed=state.installed.filter(c=>['case','psu'].includes(c));
      if (category==='cpu') { state.thermalPaste=false; state.installed=state.installed.filter(c=>c!=='cooler'); }
    }
  },'Компонент убран из сборки.');
}

function install(category) {
  if (!state.manual) return;
  const blockers = getInstallBlockers(category,toBuild(),state.installed);
  if (category==='cooler'&&!state.thermalPaste) blockers.unshift('Сначала нанеси термопасту на процессор.');
  if (blockers.length) { toast(blockers[0],'warning'); return; }
  mutate(()=>{
    if(!state.installed.includes(category))state.installed.push(category);
    if(['cpu','motherboard','psu','gpu'].includes(category))state.cablesConnected=false;
  },installedMessages[category]);
  scene?.focus(category);
}

function applyPaste() {
  if (!state.installed.includes('cpu')) { toast('Сначала установи процессор.','warning'); return; }
  if (state.installed.includes('cooler')&&!state.thermalPaste) { toast('Сначала сними кулер.','warning'); return; }
  if (state.thermalPaste) { toast('Термопаста уже нанесена. Горошины достаточно 😄'); return; }
  mutate(()=>{state.thermalPaste=true;},'Термопаста нанесена. Без бутерброда из тюбика.');
}

function connectCables() {
  if (!['case','psu','motherboard','cpu'].every(c=>state.installed.includes(c))) { toast('Сначала установи корпус, БП, плату и процессор.','warning');return; }
  if (state.cablesConnected) { toast('Питание уже подключено.');return; }
  mutate(()=>{state.cablesConnected=true;},'24-pin, питание CPU и GPU подключены.');
}

function showProduct(id, conflict = false) {
  const p = productById[id]; if (!p) return;
  const status = candidateStatus(toBuild(),p);
  openModal(p.name, `<div class="product-detail"><div class="detail-art">${componentArt(p)}<span>Схематичная иллюстрация</span></div><div><span class="brand-pill">${esc(p.brand)} / ${categoryLabels[p.category]}</span><div class="detail-price">${money(p.price)}</div><p class="muted small-text">Условная цена каталога, не предложение магазина.</p><ul class="spec-list">${p.specs.map(s=>`<li>${icon('check',14)} ${esc(s)}</li>`).join('')}</ul>${p.sourceUrl?`<a class="source-link" href="${esc(p.sourceUrl)}" target="_blank" rel="noopener noreferrer">${p.custom?'Источник автора':'Спецификация производителя'} ${icon('source',14)}</a>`:`<span class="custom-badge">Пользовательский компонент</span>`}</div></div>
    ${p.note?`<div class="info-note">${icon('help',18)}<p>${esc(p.note)}</p></div>`:''}
    ${status.issues.filter(i=>i.severity!=='info').map(i=>`<div class="issue-item ${i.severity}">${icon(i.severity==='error'?'warning':'help',19)}<div><strong>${esc(i.title)}</strong><p>${esc(i.message)}</p></div></div>`).join('')}
    ${conflict?'<p class="small-text muted">Можно оставить несовместимую деталь в проекте и заменить остальные. Запуск будет заблокирован до устранения конфликтов.</p>':''}
    <div class="modal-actions"><button class="button button-plain" data-action="${p.custom?'edit-custom':'clone-custom'}" data-id="${p.id}">${icon('edit',16)} ${p.custom?'Редактировать':'Создать на основе'}</button><button class="button button-outline" data-action="add-compare" data-id="${p.id}">${icon('compare',17)} ${state.compare.includes(p.id)?'Убрать из сравнения':'Сравнить'}</button><button class="button ${status.compatible?'button-lime':'button-dark'}" data-action="force-add" data-id="${p.id}">${icon('plus',17)} ${state.ids[p.category]===p.id?'Уже в сборке':!status.compatible?'Выбрать всё равно':'Добавить в сборку'}</button></div>`,{wide:true});
}

function showPresets() {
  openModal('Хорошая сборка начинается с идеи.',`<p class="modal-intro">Пять характеров. Реальные комплектующие. Выбери основу и сделай её своей.</p><div class="preset-grid">${presets.map((p,index)=>{
    const build = Object.fromEntries(Object.entries(p.build).map(([k,id])=>[k,productById[id]]));
    const total = evaluateBuild(build).totalPrice;
    return `<button class="preset-card preset-${index}" data-action="load-preset" data-id="${p.id}"><div class="preset-top"><span>0${index+1}</span><span>${esc(p.badge||['STARTER','SWEET SPOT','NO LIMITS','CREATOR','GOODOG'][index])}</span>${icon('external',18)}</div><div class="preset-art">${componentArt(build.case)}</div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="preset-hardware"><span>${esc(build.cpu.name)}</span><span>${esc(build.gpu.name)}</span></div><strong>${money(total)}</strong></button>`;
  }).join('')}<button class="preset-card empty-preset" data-action="start-empty"><span class="empty-plus">${icon('plus',32)}</span><h3>Чистый лист</h3><p>Пустой корпус начинается<br>с большой идеи.</p><span>Собрать с нуля ${icon('arrow',16)}</span></button></div><p class="footnote">Цены условные. Пресет Goodog вдохновлён конфигурацией i5-12400F + RTX 3060, остальные детали подобраны для симулятора.</p>`,{wide:true});
}

function loadPreset(id) {
  const p = presets.find(p=>p.id===id); if(!p)return;
  mutate(()=>{state.ids={...p.build};state.name=p.name;state.installed=state.manual?[]:Object.keys(p.build);state.thermalPaste=!state.manual;state.cablesConnected=!state.manual;state.budget=Math.ceil(evaluateBuild(toBuild()).totalPrice/50000)*50000;},'Сборка загружена. Теперь добавь свой характер.');
  closeModal();scene?.resetCamera();
}

function startEmpty() {
  mutate(()=>{state.ids={};state.installed=[];state.thermalPaste=false;state.cablesConnected=false;state.manual=true;state.name='Новая сборка';state.category='case';state.search='';state.brand='all';},'Чистый верстак. Начни с корпуса.');
  closeModal();scene?.resetCamera();
}

function showCompatibility() {
  const e = evaluateBuild(toBuild());
  const checks = [{title:'Сокет процессора',cats:['cpu','motherboard'],ready:state.ids.cpu&&state.ids.motherboard},{title:'Оперативная память',cats:['ram','motherboard'],ready:state.ids.ram&&state.ids.motherboard},{title:'Габариты и форм-фактор',cats:['case'],ready:state.ids.case},{title:'Питание системы',cats:['psu'],ready:state.ids.psu},{title:'Охлаждение',cats:['cooler'],ready:state.ids.cooler}];
  openModal('Всё должно подойти.',`<div class="compatibility-summary ${e.compatible?'good':'bad'}">${icon(e.compatible?'success':'warning',35)}<div><h3>${e.compatible?e.complete?'Компоненты совместимы':'Явных конфликтов пока нет':'Есть конфликты компонентов'}</h3><p>${e.complete?'Проверка по спецификациям каталога.':`Осталось выбрать ${e.missing.length} компонентов.`}</p></div></div><div class="compatibility-checks">${checks.map(c=>{const issue=e.errors.some(i=>i.categories.some(k=>c.cats.includes(k)));return `<div>${icon(!c.ready?'square':issue?'warning':'check',18)}<span>${c.title}</span><strong>${!c.ready?'Ожидает выбора':issue?'Проверь':'В порядке'}</strong></div>`;}).join('')}</div>${e.issues.map(i=>`<div class="issue-item ${i.severity}">${icon(i.severity==='error'?'warning':'help',18)}<div><strong>${esc(i.title)}</strong><p>${esc(i.message)}</p></div></div>`).join('')}<div class="info-note">${icon('help',19)}<p>Это симулятор: версия BIOS, особенности конкретной ревизии, расположение разъёмов и комплект креплений требуют отдельной проверки перед реальной покупкой. XMP/EXPO и тонкая настройка BIOS здесь не моделируются.</p></div>`,{wide:true});
}

function showSave() {
  openModal('Сохрани свою идею.',`<p class="modal-intro">Сборки хранятся в этом браузере. Экспортируй JSON, чтобы перенести их на другое устройство.</p><form id="save-form"><label class="field-label" for="save-name">Название сборки</label><input class="text-input" id="save-name" maxlength="64" required value="${esc(state.name)}"><div class="save-preview">${icon('case',28)}<div><strong>${Object.keys(state.ids).length} компонентов</strong><span>${money(evaluateBuild(toBuild()).totalPrice)}</span></div><span class="save-preview-badge">ТВОЯ СБОРКА</span></div><button class="button button-lime full-width" type="submit">${icon('save',18)} Сохранить в моих сборках</button></form><div class="export-options"><button data-action="export">${icon('download',18)} Экспорт JSON</button><button data-action="import">${icon('upload',18)} Импорт JSON</button><button data-action="share">${icon('link',18)} Поделиться</button></div>`);
}

function validSaves() {
  const stored=readJson(SAVES,[]);
  return Array.isArray(stored)?stored.filter(item=>item&&typeof item==='object'&&typeof item.id==='string'&&item.snapshot).slice(0,30):[];
}

function showSaved() {
  const saves=validSaves();
  openModal('Мои сборки',`${saves.length?`<div class="saved-list">${saves.map(item=>{let snap;try{snap=validateSnapshot(item.snapshot);}catch{return '';}const lookup={...productById,...Object.fromEntries(snap.customComponents.map(p=>[p.id,p]))};const build=Object.fromEntries(Object.entries(snap.ids).map(([k,id])=>[k,lookup[id]]));return `<div class="saved-card"><span class="saved-icon">${icon('case',26)}</span><div><h3>${esc(snap.name)}</h3><p>${Object.keys(snap.ids).length} компонентов · ${money(evaluateBuild(build).totalPrice)}</p><small>${new Date(item.date).toLocaleDateString('ru-RU')}</small></div><button class="button button-outline button-small" data-action="load-save" data-id="${esc(item.id)}">Открыть</button><button class="icon-button" data-action="delete-save" data-id="${esc(item.id)}" aria-label="Удалить ${esc(snap.name)}">${icon('trash',17)}</button></div>`;}).join('')}</div>`:`<div class="empty-state">${icon('folder',45)}<h3>Здесь будут твои лучшие идеи.</h3><p>Сохрани текущую сборку, чтобы вернуться к ней позже.</p><button class="button button-lime" data-action="save">${icon('save',17)} Сохранить текущую</button></div>`}<div class="export-options"><button data-action="import">${icon('upload',18)} Импортировать JSON</button><button data-action="export">${icon('download',18)} Экспортировать текущую</button></div>`);
}

function saveBuild(name) {
  const clean=name.trim();if(!clean)return;
  state.name=clean.slice(0,64);persist();renderBuild();
  const item={id:createLocalId(),date:new Date().toISOString(),snapshot:snapshot()};
  try {localStorage.setItem(SAVES,JSON.stringify([item,...validSaves()].slice(0,30)));closeModal();toast('Сборка сохранена. Отличная база для «а что если…».');}
  catch {toast('Не удалось сохранить в браузере. Используй экспорт JSON.','warning');}
}

function download(content,filename,type='application/json') {
  const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
}

function exportBuild() {download(JSON.stringify({format:'pc-lab-build',version:2,...snapshot()},null,2),'pc-lab-build.json');toast('Сборка экспортирована вместе с пользовательскими деталями.');}

async function shareBuild() {
  const payload={v:2,n:state.name,p:state.ids,b:state.budget,c:snapshot().customComponents};
  const bytes=new TextEncoder().encode(JSON.stringify(payload));
  const encoded=btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const url=`${location.origin}${location.pathname}#build=${encoded}`;
  try {await navigator.clipboard.writeText(url);toast('Ссылка на сборку скопирована.');}
  catch {openModal('Поделиться сборкой',`<p class="modal-intro">Скопируй ссылку. В ней только название, комплектующие и бюджет.</p><input class="text-input share-url" readonly value="${esc(url)}" aria-label="Ссылка на сборку"><p class="footnote">Для открытия сайта получателю нужен доступ к нему. Ссылка не меняет настройки доступа сайта.</p>`);$('.share-url')?.select();}
}

function showCompare() {
  const items=state.compare.map(id=>productById[id]).filter(Boolean);
  if (!items.length) {openModal('Сравнение без гаданий.',`<div class="empty-state">${icon('compare',42)}<h3>Две детали. Один сложный выбор.</h3><p>Открой карточку компонента и нажми «Сравнить». Можно сравнить до трёх моделей одной категории.</p><button class="button button-lime" data-action="close-modal">К каталогу ${icon('arrow',17)}</button></div>`);return;}
  const fields={cpu:[['socket','Сокет'],['cores','Ядра'],['threads','Потоки'],['boostClock','Boost, ГГц'],['tdp','TDP, Вт'],['peakPower','Лимит питания, Вт']],gpu:[['vram','Видеопамять, ГБ'],['power','Мощность, Вт'],['length','Длина, мм'],['recommendedPsu','Рекомендуемый БП, Вт']],motherboard:[['socket','Сокет'],['memoryType','Тип памяти'],['formFactor','Форм-фактор'],['memorySlots','DIMM-слоты'],['maxMemory','Макс. память, ГБ'],['m2Slots','M.2-слоты']],ram:[['memoryType','Тип'],['capacity','Объём, ГБ'],['modules','Модулей'],['speed','Скорость, MT/s'],['height','Высота, мм']],storage:[['capacity','Объём, ГБ'],['interface','Интерфейс']],cooler:[['kind','Тип'],['height','Высота, мм'],['radiator','Радиатор, мм'],['sockets','Сокеты']],psu:[['watts','Мощность, Вт'],['formFactor','Форм-фактор'],['length','Длина, мм']],case:[['supportedFormFactors','Форматы плат'],['maxGpuLength','GPU до, мм'],['maxCoolerHeight','Кулер до, мм'],['radiatorSupport','Радиаторы, мм']]};
  openModal('Детали решают.',`<div class="comparison-table"><table><thead><tr><th>Характеристики</th>${items.map(p=>`<th>${componentArt(p)}<strong>${esc(p.name)}</strong><button class="mini-button" data-action="remove-compare" data-id="${p.id}" aria-label="Убрать из сравнения">${icon('x',14)}</button></th>`).join('')}</tr></thead><tbody><tr><th>Цена симулятора</th>${items.map(p=>`<td class="compare-price">${money(p.price)}</td>`).join('')}</tr>${(fields[items[0].category]||[]).map(([field,label])=>`<tr><th>${label}</th>${items.map(p=>`<td>${esc(Array.isArray(p[field])?p[field].join(' / '):p[field]??'—')}</td>`).join('')}</tr>`).join('')}<tr><th>Выбор</th>${items.map(p=>`<td><button class="button button-lime button-small" data-action="add" data-id="${p.id}">${icon('plus',14)} В сборку</button></td>`).join('')}</tr></tbody></table></div><p class="footnote">Источник спецификаций доступен в карточке каждой модели. Цены — условная экономика симулятора.</p>`,{wide:true});
}

function showBenchmark() {
  const build=toBuild();const evaluation=evaluateBuild(build);
  const valid=validateBoot(build,{installed:state.installed,thermalPaste:state.thermalPaste,cablesConnected:state.cablesConnected});
  const ready=valid.canBoot;
  const results=state.benchResults;
  openModal('А на что он способен?',`<div class="lab-intro"><span class="simulation-badge">${icon('benchmark',14)} РАСЧЁТНАЯ МОДЕЛЬ</span><p>Оценка по условным индексам CPU/GPU. Это не реальные игровые замеры.</p></div><div class="benchmark-controls"><label>Разрешение<select id="bench-resolution"><option value="1080p" ${state.resolution==='1080p'?'selected':''}>1920 × 1080 · Full HD</option><option value="1440p" ${state.resolution==='1440p'?'selected':''}>2560 × 1440 · QHD</option><option value="4k" ${state.resolution==='4k'?'selected':''}>3840 × 2160 · 4K</option></select></label><label>Качество<select id="bench-quality"><option value="medium" ${state.quality==='medium'?'selected':''}>Среднее</option><option value="high" ${state.quality==='high'?'selected':''}>Высокое</option><option value="ultra" ${state.quality==='ultra'?'selected':''}>Ультра</option></select></label><button class="button button-lime" data-action="run-benchmark" ${!ready?'disabled':''}>${icon('play',17)} Рассчитать</button></div>${!ready?`<div class="issue-item warning">${icon('warning',20)}<div><strong>Сначала заверши сборку</strong><p>${esc(valid.steps.find(s=>s.status==='fail')?.message||'Проверь компоненты и подключения.')}</p></div></div>`:''}<div class="benchmark-grid">${benchmarkGames.map((game,index)=>{const r=results?.[game.id];return `<div class="benchmark-card"><div class="game-monogram game-${index}">${['CP','CS','MC','FH'][index]}<span>${['2077','2','JAVA','5'][index]}</span></div><div class="game-info"><h3>${game.name}</h3><p>${game.subtitle}</p></div><div class="fps-value">${r?.available?r.fps:'—'}<small>FPS</small></div><div class="fps-track"><span style="width:${r?.available?Math.min(r.fps/400*100,100):0}%"></span></div><div class="fps-meta"><span>1% low <strong>${r?.available?r.low1:'—'}</strong></span><span>${r?.available?`Ограничение: ${esc(r.bottleneckLabel)}`:'Нажми «Рассчитать»'}</span></div></div>`;}).join('')}</div><div class="lab-summary"><div><span>Пиковая нагрузка</span><strong>${evaluation.power.estimated} <small>Вт</small></strong></div><div><span>Запас БП</span><strong>${build.psu?evaluation.power.headroom:'—'} <small>Вт</small></strong></div><div><span>CPU под нагрузкой*</span><strong>${evaluation.thermals.cpu??'—'} <small>°C</small></strong></div><div><span>Игровой индекс*</span><strong>${evaluation.performance.gaming}<small> / 100</small></strong></div></div><p class="footnote">* Температура, индексы и FPS рассчитаны упрощённой учебной моделью. Без RT, DLSS/FSR и генерации кадров. Реальные результаты зависят от игры, драйверов, BIOS, охлаждения и настроек.</p>`,{wide:true});
}

function startBoot() {
  if (state.powered) {state.powered=false;scene?.setPowered(false);renderBuild();toast('Компьютер выключен.');return;}
  const result=validateBoot(toBuild(),{installed:state.installed,thermalPaste:state.thermalPaste,cablesConnected:state.cablesConnected});
  const token=++bootToken;
  openModal('Первый запуск.',`<div class="boot-screen"><div class="boot-screen-brand">PC LAB <span>UEFI / SIMULATOR</span></div><div class="boot-console" id="boot-console"></div><div class="boot-screen-footer" id="boot-progress">Подача питания…<span class="console-cursor"></span></div></div><div id="boot-result"></div>`,{wide:true});
  let index=0;
  const tick=()=>{
    if(token!==bootToken||!$('#boot-console'))return;
    const step=result.steps[index];
    if(step){$('#boot-console').insertAdjacentHTML('beforeend',`<div class="console-line ${step.status}"><span>${step.status==='pass'?'[ OK ]':'[FAIL]'}</span><strong>${esc(step.name)}</strong><p>${esc(step.message)}</p></div>`);index++;setTimeout(tick,window.matchMedia('(prefers-reduced-motion: reduce)').matches?30:320);}
    else {
      $('#boot-progress').textContent=result.canBoot?'POST COMPLETE · SYSTEM READY':'POST HALTED · CHECK HARDWARE';
      state.powered=result.canBoot;scene?.setPowered(state.powered);renderBuild();
      $('#boot-result').innerHTML=`<div class="boot-result ${result.canBoot?'success':'failed'}"><span>${icon(result.canBoot?'success':'warning',30)}</span><div><h3>${result.canBoot?'Оно живое. И это ты собрал.':'Спокойно, дым пока виртуальный.'}</h3><p>${result.canBoot?'Все проверки пройдены. Твоя сборка готова к виртуальным тестам.':'Исправь пункты FAIL и попробуй снова. Ошибаться здесь бесплатно.'}</p></div></div><div class="modal-actions"><button class="button button-outline" data-action="close-modal">Вернуться в мастерскую</button>${result.canBoot?`<button class="button button-lime" data-action="benchmark">${icon('benchmark',17)} Оценить мощность</button>`:`<button class="button button-dark" data-action="compatibility">${icon('help',17)} Разобраться</button>`}</div>`;
    }
  };setTimeout(tick,350);
}

function showHelp() {
  openModal('Добро пожаловать в мастерскую.',`<div class="help-hero"><span class="brand-mark large">${icon('case',35)}</span><h3>Никаких отвёрток.<br>Только любопытство.</h3></div><div class="help-steps"><div><span>01</span><div><h3>Выбери железо</h3><p>Категории слева. «+» добавляет компонент, карточка открывает характеристики, источник и сравнение. Фильтр скрывает несовместимые варианты.</p></div></div><div><span>02</span><div><h3>Собери по-своему</h3><p>В обычном режиме детали меняются сразу. Включи «Ручную сборку» справа или начни с чистого листа: установи корпус, детали, нанеси термопасту и подключи питание.</p></div></div><div><span>03</span><div><h3>Нажми ту самую кнопку</h3><p>«Включить ПК» запускает виртуальный POST. Он проверит установки, питание, память и охлаждение. После этого попробуй расчёт FPS в лаборатории.</p></div></div></div><div class="keyboard-help"><span><kbd>ЛКМ</kbd> Вращать</span><span><kbd>Колесо</kbd> Масштаб</span><span><kbd>/</kbd> Поиск</span><span><kbd>Ctrl Z</kbd> Отменить</span><span><kbd>Esc</kbd> Закрыть</span></div><p class="footnote">3D-детали — схематичные модели. Характеристики реальных комплектующих взяты из каталога производителя; цены и производительность рассчитаны для игры.</p>`,{wide:true});
}

function showDataInfo() {
  openModal('Реальное железо. Честная симуляция.',`<div class="data-info-list"><div>${icon('cpu',25)}<div><h3>${officialProducts.length} реальных моделей</h3><p>Сокеты, тип памяти, габариты и мощность взяты из спецификаций производителей. В каждой карточке есть ссылка на первоисточник. Каталог включает проверенные модели, а не все новинки рынка.</p></div></div><div>${icon('case',25)}<div><h3>Схематичная 3D-мастерская</h3><p>Модели построены специально для симулятора. Они передают устройство компьютера и выбранный тип охлаждения, но не являются точными CAD-копиями конкретных товаров.</p></div></div><div>${icon('benchmark',25)}<div><h3>Цены, FPS и температуры — модель</h3><p>Рубли здесь — условная экономика каталога, без связи с магазинами. FPS, тепловые показатели и нагрузка рассчитаны учебной формулой и не заменяют реальные измерения.</p></div></div><div>${icon('save',25)}<div><h3>Сборки остаются у тебя</h3><p>Сохранения находятся в localStorage этого браузера. JSON и ссылка позволяют перенести конфигурацию. При очистке данных браузера локальные сохранения удаляются.</p></div></div></div><a class="button button-outline" href="https://github.com/Goodog2013/PC-Sim-2" target="_blank" rel="noopener noreferrer">Открытый исходный код ${icon('source',16)}</a>`,{wide:true});
}

function showFilters() {
  const brands=[...new Set(products.filter(p=>state.search.trim()||p.category===state.category).map(p=>p.brand))];
  openModal('Найдём нужную деталь.',`<form id="filters-form"><label class="field-label" for="brand-filter">Производитель</label><select class="text-input" id="brand-filter"><option value="all">Все производители</option>${brands.map(brand=>`<option value="${esc(brand)}" ${state.brand===brand?'selected':''}>${esc(brand)}</option>`).join('')}</select><label class="field-label" for="sort-filter">Сортировка</label><select class="text-input" id="sort-filter"><option value="popular" ${state.sort==='popular'?'selected':''}>Порядок каталога</option><option value="price-asc" ${state.sort==='price-asc'?'selected':''}>Сначала дешевле</option><option value="price-desc" ${state.sort==='price-desc'?'selected':''}>Сначала дороже</option><option value="name" ${state.sort==='name'?'selected':''}>По названию</option></select><div class="modal-actions"><button type="submit" class="button button-lime">Применить ${icon('check',16)}</button></div></form>`);
}

function customFieldMarkup(f, values) {
  const value=values[f.key];
  if(f.type==='checkbox')return `<label class="editor-field editor-checkbox"><input type="checkbox" name="${f.key}" ${value?'checked':''}><span>${esc(f.label)}</span></label>`;
  let control='';
  if(f.type==='select')control=`<select class="text-input" name="${f.key}" id="custom-${f.key}">${f.options.map(o=>{const [v,label]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${String(value)===String(v)?'selected':''}>${esc(label)}</option>`;}).join('')}</select>`;
  else control=`<input class="text-input" name="${f.key}" id="custom-${f.key}" type="${f.type==='number'?'number':'text'}" value="${esc(Array.isArray(value)?value.join(', '):value??'')}" ${f.type==='number'?`min="${f.min}" max="${f.max}" step="${f.step||1}"`:'maxlength="250"'} ${f.optional?'':'required'} placeholder="${esc(f.placeholder||'')}">`;
  return `<div class="editor-field"><label for="custom-${f.key}">${esc(f.label)}</label>${control}${f.hint?`<small>${esc(f.hint)}</small>`:''}</div>`;
}

function showCustomEditor({category=state.category,base=null,existingId=null}={}) {
  editorProduct=customDefaults(category,base||{});
  editorExistingId=existingId;
  if(base&&!existingId&&!base.custom&&!base._draft)editorProduct.name=`${base.name} Custom`.slice(0,100);
  const p=editorProduct;
  openModal(existingId?'Твоя деталь. Твои правила.':'Создай то, чего ещё нет.',`<p class="modal-intro">Задай характеристики: симулятор проверит сокет, память, размеры и питание так же, как у готовых моделей. Собственные детали отмечены значком CUSTOM.</p><form id="custom-form" class="custom-editor"><div class="editor-grid"><div class="editor-field"><label for="custom-category">Тип компонента</label><select class="text-input" id="custom-category" ${existingId?'disabled':''}>${categoryOrder.map(c=>`<option value="${c}" ${c===category?'selected':''}>${categoryLabels[c]}</option>`).join('')}</select></div><div class="editor-field"><label for="custom-brand">Производитель / твой бренд</label><input class="text-input" id="custom-brand" name="brand" value="${esc(p.brand)}" maxlength="40" required></div><div class="editor-field editor-field-wide"><label for="custom-name">Название модели</label><input class="text-input" id="custom-name" name="name" value="${esc(p.name)}" maxlength="100" placeholder="Например, Goodog RTX 9090" required></div><div class="editor-field"><label for="custom-price">Цена симулятора, ₽</label><input class="text-input" type="number" name="price" id="custom-price" min="0" max="10000000" step="1" value="${p.price}" required></div><div class="editor-field"><label for="custom-source">Ссылка на источник (необязательно)</label><input class="text-input" type="url" name="sourceUrl" id="custom-source" value="${esc(p.sourceUrl||'')}" placeholder="https://…" maxlength="500"></div></div><h3 class="editor-section">${icon(category,18)} Характеристики и совместимость</h3><div class="editor-grid">${customFields[category].map(f=>customFieldMarkup(f,p)).join('')}</div><div class="info-note">${icon('help',18)}<p>Собственные компоненты могут быть вымышленными. Индексы производительности и охлаждения — параметры модели игры. Внешний вид в 3D останется схематичным.</p></div><p class="editor-error" id="custom-error" role="alert" hidden></p><div class="modal-actions"><button class="button button-outline" type="submit" data-install="false">${icon('save',16)} Сохранить в каталог</button><button class="button button-lime" type="submit" data-install="true">${icon('plus',17)} ${existingId?'Сохранить и выбрать':'Создать и выбрать'}</button></div></form>`,{wide:true});
}

function showCustomLibrary() {
  openModal('Собственное железо.',`<div class="custom-library-heading"><p class="modal-intro">Проектируй свои модели или меняй характеристики существующих. ${customProducts.length} / 200 деталей в твоём каталоге.</p><button class="button button-lime" data-action="create-custom">${icon('plus',17)} Создать компонент</button></div>${customProducts.length?`<div class="custom-list">${customProducts.map(p=>`<article class="custom-card"><div class="custom-art">${componentArt(p)}</div><div class="custom-copy"><span class="custom-badge">CUSTOM / ${esc(shortLabels[p.category])}</span><h3>${esc(p.name)}</h3><p>${esc(p.specs.slice(0,2).join(' · '))}</p><strong>${money(p.price)}</strong></div><div class="custom-card-actions"><button class="icon-button" data-action="edit-custom" data-id="${p.id}" title="Редактировать" aria-label="Редактировать ${esc(p.name)}">${icon('edit',17)}</button><button class="icon-button" data-action="delete-custom" data-id="${p.id}" title="Удалить" aria-label="Удалить ${esc(p.name)}">${icon('trash',17)}</button><button class="button button-outline button-small" data-action="add" data-id="${p.id}">${icon('plus',15)} В сборку</button></div></article>`).join('')}</div>`:`<div class="empty-state"><span class="custom-empty-icon">${icon('cpu',48)}</span><h3>Следующее поколение начинается с тебя.</h3><p>Придумай процессор, видеокарту или целую платформу.<br>Либо открой настоящую деталь и выбери «Создать на основе».</p><button class="button button-outline" data-action="create-custom">Мой первый компонент ${icon('arrow',16)}</button></div>`}<div class="export-options"><button data-action="export-custom">${icon('download',17)} Экспорт своего каталога</button><button data-action="import">${icon('upload',17)} Импорт JSON</button></div><p class="footnote">Каталог хранится в этом браузере. Выбранные пользовательские детали включаются в сохранения, JSON и ссылку сборки. Новые детали не публикуются в общий каталог.</p>`,{wide:true});
}

function invalidateManualPart(category) {
  state.installed=state.installed.filter(c=>c!==category);
  state.cablesConnected=false;
  if(category==='case')state.installed=[];
  if(category==='motherboard')state.installed=state.installed.filter(c=>['case','psu'].includes(c));
  if(category==='cpu'||category==='cooler'){state.thermalPaste=false;state.installed=state.installed.filter(c=>c!=='cooler');}
}

function submitCustom(form,selectPart) {
  try {
    const raw=Object.fromEntries(new FormData(form));
    raw.category=editorProduct.category;
    if(editorExistingId)raw.id=editorExistingId;
    raw.revision=(editorExistingId?productById[editorExistingId]?.revision||1:0)+1;
    const product=normalizeCustomProduct(raw);
    const changesBuild=selectPart||state.ids[product.category]===product.id;
    const apply=()=>{
      mergeCustom([product]);
      if(selectPart)state.ids[product.category]=product.id;
      if(changesBuild){if(state.manual)invalidateManualPart(product.category);else{state.installed=Object.keys(state.ids);state.thermalPaste=true;state.cablesConnected=true;}}
      state.category=product.category;state.brand='all';state.search='';state.compatibleOnly=false;
    };
    if(changesBuild)mutate(apply);else{apply();persist();render();}
    closeModal();toast(`${product.name} сохранён в твоём каталоге.`);
    if(selectPart)scene?.focus(product.category);
  }catch(error){const el=$('#custom-error');el.hidden=false;el.textContent=error.message;el.scrollIntoView({block:'nearest',behavior:'smooth'});}
}

document.addEventListener('click',async(event)=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  if(button.disabled)return;
  const {action,id,category,color}=button.dataset;
  if(button.tagName==='A')event.preventDefault();
  switch(action){
    case 'home':closeModal();window.scrollTo({top:0,behavior:'smooth'});break;
    case 'category':state.category=category;state.brand='all';state.search='';renderCatalog();renderBuild();scene?.focus(category);if(innerWidth<900)$('#catalog').scrollIntoView({behavior:'smooth',block:'start'});break;
    case 'product':showProduct(id);break;
    case 'add':addProduct(id);break;
    case 'force-add':addProduct(id,true);break;
    case 'remove':removeProduct(category);break;
    case 'presets':showPresets();break;
    case 'load-preset':loadPreset(id);break;
    case 'new':openModal('Начать новую историю?',`<p class="modal-intro">Текущую сборку можно сохранить перед новым экспериментом. После очистки её также можно вернуть кнопкой отмены.</p><div class="new-options"><button class="option-card" data-action="start-empty">${icon('plus',28)}<strong>С чистого листа</strong><span>Пустой верстак и ручная сборка</span>${icon('arrow',18)}</button><button class="option-card" data-action="presets">${icon('explode',28)}<strong>На основе пресета</strong><span>Проверенная отправная точка</span>${icon('arrow',18)}</button></div><button class="button button-outline full-width" data-action="save">${icon('save',17)} Сначала сохранить текущую</button>`);break;
    case 'start-empty':startEmpty();break;
    case 'close-modal':closeModal();break;
    case 'compatibility':showCompatibility();break;
    case 'save':showSave();break;
    case 'saved':showSaved();break;
    case 'load-save':{const item=validSaves().find(s=>s.id===id);if(item){try{const checked=validateSnapshot(item.snapshot);mutate(()=>restore(checked),'Сборка открыта.');closeModal();}catch(error){toast(error.message,'warning');}}break;}
    case 'delete-save':{const saves=validSaves();const item=saves.find(s=>s.id===id);openModal('Удалить сохранение?',`<p class="modal-intro">Удалить «${esc(item?.snapshot?.name||'сборку')}» из сохранений этого браузера? Текущая сборка на верстаке останется.</p><div class="modal-actions"><button class="button button-outline" data-action="saved">Назад</button><button class="button button-danger" data-action="confirm-delete-save" data-id="${esc(id)}">Удалить</button></div>`);break;}
    case 'confirm-delete-save':try{localStorage.setItem(SAVES,JSON.stringify(validSaves().filter(s=>s.id!==id)));showSaved();toast('Сохранение удалено.');}catch{toast('Не удалось изменить сохранения.','warning');}break;
    case 'export':exportBuild();break;
    case 'export-custom':download(JSON.stringify({format:'pc-lab-custom-catalog',version:1,components:customProducts},null,2),'pc-lab-custom-components.json');toast('Свой каталог экспортирован.');break;
    case 'import':$('#import-file').click();break;
    case 'share':await shareBuild();break;
    case 'help':showHelp();break;
    case 'data-info':showDataInfo();break;
    case 'custom-library':showCustomLibrary();break;
    case 'create-custom':showCustomEditor();break;
    case 'clone-custom':if(productById[id])showCustomEditor({category:productById[id].category,base:productById[id]});break;
    case 'edit-custom':if(productById[id]?.custom)showCustomEditor({category:productById[id].category,base:productById[id],existingId:id});break;
    case 'delete-custom':if(productById[id]?.custom)openModal('Удалить свою деталь?',`<p class="modal-intro">«${esc(productById[id].name)}» будет удалён из пользовательского каталога${Object.values(state.ids).includes(id)?' и текущей сборки':''}. Сохранённые ранее сборки и экспортированные файлы сохранят копию этой детали.</p><div class="modal-actions"><button class="button button-outline" data-action="custom-library">Отмена</button><button class="button button-danger" data-action="confirm-delete-custom" data-id="${id}">Удалить</button></div>`);break;
    case 'confirm-delete-custom':{
      const p=productById[id];if(!p?.custom)break;
      mutate(()=>{if(state.ids[p.category]===id){delete state.ids[p.category];invalidateManualPart(p.category);}customProducts=customProducts.filter(item=>item.id!==id);state.compare=state.compare.filter(item=>item!==id);refreshCatalog();saveCustomCatalog();});showCustomLibrary();toast('Пользовательский компонент удалён.');break;
    }
    case 'filters':showFilters();break;
    case 'reset-filters':state.search='';state.brand='all';state.compatibleOnly=false;renderCatalog();break;
    case 'compare':showCompare();break;
    case 'add-compare':{
      if(state.compare.includes(id))state.compare=state.compare.filter(i=>i!==id);
      else{if(state.compare.length&&productById[state.compare[0]].category!==productById[id].category){toast('Сравнивай детали одной категории. Сначала очисти сравнение.','warning');return;}if(state.compare.length>=3){toast('Можно сравнить до трёх компонентов.','warning');return;}state.compare.push(id);}
      renderCatalog();showProduct(id);toast(state.compare.includes(id)?'Добавлено к сравнению.':'Убрано из сравнения.');break;
    }
    case 'remove-compare':state.compare=state.compare.filter(i=>i!==id);renderCatalog();showCompare();break;
    case 'toggle-mode':if(!state.manual){openModal('Собери его своими руками.',`<p class="modal-intro">Выбранные компоненты останутся в комплекте, а верстак освободится. Установи детали по порядку, нанеси термопасту и подключи кабели.</p><div class="manual-promise">${icon('case',26)}<span>${Object.keys(state.ids).length} деталей в комплекте<br><strong>Одна сборка. Полностью твоя.</strong></span></div><div class="modal-actions"><button class="button button-outline" data-action="close-modal">Пока оставить как есть</button><button class="button button-lime" data-action="enable-manual">${icon('settings',17)} Начать сборку</button></div>`);}else mutate(()=>{state.manual=false;state.installed=Object.keys(state.ids);state.thermalPaste=true;state.cablesConnected=true;},'Быстрый режим: компоненты устанавливаются автоматически.');break;
    case 'enable-manual':mutate(()=>{state.manual=true;state.installed=[];state.thermalPaste=false;state.cablesConnected=false;},'Начинаем с корпуса. Смотри следующий шаг под верстаком.');closeModal();break;
    case 'install':install(category);break;
    case 'install-next':{const next=nextAssemblyStep();if(next==='paste')applyPaste();else if(next==='cables')connectCables();else if(next)install(next);break;}
    case 'paste':applyPaste();break;
    case 'cables':connectCables();break;
    case 'power':startBoot();break;
    case 'benchmark':showBenchmark();break;
    case 'run-benchmark':state.resolution=$('#bench-resolution').value;state.quality=$('#bench-quality').value;state.benchResults=Object.fromEntries(benchmarkGames.map(g=>[g.id,estimateBenchmark(toBuild(),{resolution:state.resolution,preset:state.quality,game:g.id})]));showBenchmark();break;
    case 'rename':openModal('Как назовём эту машину?',`<form id="rename-form"><label class="field-label" for="project-name-input">Название проекта</label><input class="text-input" id="project-name-input" maxlength="64" required value="${esc(state.name)}"><div class="modal-actions"><button type="submit" class="button button-lime">Готово ${icon('check',16)}</button></div></form>`);break;
    case 'budget':openModal('Бюджет под контролем.',`<form id="budget-form"><p class="modal-intro">Поставь цель для своей сборки. В каталоге используются условные цены симулятора.</p><label class="field-label" for="budget-input">Бюджет, ₽</label><input class="text-input" type="number" id="budget-input" min="10000" max="2000000" step="1000" required value="${state.budget}"><div class="budget-chips">${[50000,100000,150000,200000,400000].map(v=>`<button type="button" data-action="budget-preset" data-value="${v}">${v/1000} тыс.</button>`).join('')}</div><div class="modal-actions"><button type="submit" class="button button-lime">Задать бюджет ${icon('check',16)}</button></div></form>`);break;
    case 'budget-preset':$('#budget-input').value=button.dataset.value;break;
    case 'undo':if(undoStack.length){redoStack.push(snapshot());restore(undoStack.pop());persist();render();toast('Изменение отменено.');}break;
    case 'redo':if(redoStack.length){undoStack.push(snapshot());restore(redoStack.pop());persist();render();toast('Изменение восстановлено.');}break;
    case 'reset-view':scene?.resetCamera();break;
    case 'explode':state.exploded=!state.exploded;scene?.setExploded(state.exploded);button.classList.toggle('active',state.exploded);button.setAttribute('aria-pressed',state.exploded);break;
    case 'labels':state.labels=!state.labels;scene?.setLabels(state.labels);button.classList.toggle('active',state.labels);button.setAttribute('aria-pressed',state.labels);break;
    case 'glass':state.glass=!state.glass;scene?.setSidePanel(state.glass);button.classList.toggle('active',state.glass);button.setAttribute('aria-pressed',state.glass);$('.scene-view-label').innerHTML=`${state.glass?'Стеклянная панель':'Открытый корпус'} ${icon('chevron',12)}`;break;
    case 'rgb':$('#rgb-palette').hidden=!$('#rgb-palette').hidden;break;
    case 'set-rgb':state.rgb=color;scene?.setRgb(color);$('.rgb-button span').style.background=color;$('#rgb-palette').hidden=true;break;
    case 'capture':{try{const data=scene?.capture?.();if(!data)throw new Error('Нет изображения');const a=document.createElement('a');a.href=data;a.download='pc-lab-build.png';a.click();toast('Снимок сборки сохранён.');}catch{toast('Снимок недоступен в этом браузере.','warning');}break;}
    case 'scene-info':openModal('Посмотри под другим углом.',`<p class="modal-intro">Перетаскивай корпус мышью, приближай колёсиком и нажимай на детали. Панель снизу включает разнесённый вид, подписи компонентов, боковое стекло и цвет RGB.</p><p class="small-text muted">Изображение — интерактивная схема устройства ПК. Оно не воспроизводит внешний вид каждой конкретной модели один в один.</p><button class="button button-lime" data-action="close-modal">К сборке ${icon('arrow',17)}</button>`);break;
  }
});

document.addEventListener('submit',(event)=>{
  const form=event.target;
  if(!['save-form','rename-form','budget-form','filters-form','custom-form'].includes(form.id))return;
  event.preventDefault();
  if(form.id==='custom-form')submitCustom(form,event.submitter?.dataset.install==='true');
  if(form.id==='save-form')saveBuild($('#save-name').value);
  if(form.id==='rename-form'){const value=$('#project-name-input').value.trim();if(value){mutate(()=>{state.name=value.slice(0,64);});closeModal();}}
  if(form.id==='budget-form'){const value=Number($('#budget-input').value);if(value>=10000&&value<=2000000){mutate(()=>{state.budget=value;},'Бюджет обновлён.');closeModal();}}
  if(form.id==='filters-form'){state.brand=$('#brand-filter').value;state.sort=$('#sort-filter').value;renderProducts();closeModal();}
});

document.addEventListener('input',(event)=>{if(event.target.id==='catalog-search'){state.search=event.target.value;renderProducts();}});
document.addEventListener('change',(event)=>{
  if(event.target.id==='compatible-filter'){state.compatibleOnly=event.target.checked;renderProducts();}
  if(event.target.id==='bench-resolution'||event.target.id==='bench-quality'){state.resolution=$('#bench-resolution').value;state.quality=$('#bench-quality').value;state.benchResults=null;showBenchmark();}
  if(event.target.id==='custom-category'){
    const base={_draft:true,brand:$('#custom-brand').value,name:$('#custom-name').value,price:Number($('#custom-price').value)||0,sourceUrl:$('#custom-source').value};
    showCustomEditor({category:event.target.value,base});
  }
});

$('#import-file').addEventListener('change',async(event)=>{
  const file=event.target.files?.[0];if(!file)return;
  try {
    if(file.size>1000000)throw new Error('Файл слишком большой. Максимум 1 МБ.');
    const parsed=JSON.parse(await file.text());
    if(parsed.format==='pc-lab-custom-catalog'){
      const components=normalizeCustomBatch(parsed.components);
      mutate(()=>{mergeCustom(components);if(state.manual)for(const product of components)if(state.ids[product.category]===product.id)invalidateManualPart(product.category);});showCustomLibrary();toast(`Импортировано компонентов: ${components.length}.`);
    }else{const checked=validateSnapshot(parsed);mutate(()=>restore(checked),'Сборка импортирована.');closeModal();}
  }
  catch(error){toast(`Не удалось импортировать: ${error.message}`,'warning');}
  finally{event.target.value='';}
});

document.addEventListener('keydown',(event)=>{
  const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
  if(event.key==='Escape'){if(activeModal)closeModal();$('#rgb-palette').hidden=true;}
  if(activeModal&&event.key==='Tab'){
    const focusable=$$('.modal button:not([disabled]), .modal a[href], .modal input, .modal select, .modal [tabindex="0"]').filter(el=>el.offsetParent!==null);
    if(!focusable.length)return;
    if(event.shiftKey&&document.activeElement===focusable[0]){event.preventDefault();focusable.at(-1).focus();}
    else if(!event.shiftKey&&document.activeElement===focusable.at(-1)){event.preventDefault();focusable[0].focus();}
  }
  if(!typing&&!activeModal&&event.key==='/'){event.preventDefault();$('#catalog-search').focus();}
  if(!typing&&!activeModal&&(event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z'){event.preventDefault();$(event.shiftKey?'#redo-button':'#undo-button').click();}
});
$('#modal-root').addEventListener('click',(event)=>{if(event.target.classList.contains('modal-backdrop'))closeModal();});

render();
if(importedFromLink){
  saveCustomCatalog();
  persist();
  if(persistenceAvailable)history.replaceState(null,'',location.pathname+location.search);
}
scene = new PCScene($('#scene-container'),{
  onSelect(category){state.category=category;state.brand='all';renderCatalog();renderBuild();const product=toBuild()[category];$('#scene-selection').innerHTML=product?`${icon(category,17)}<div><span>${categoryLabels[category]}</span><strong>${esc(product.name)}</strong></div><button class="icon-button small" data-action="product" data-id="${product.id}" title="Подробнее" aria-label="Подробнее">${icon('external',16)}</button>`:'';setTimeout(()=>{$('#scene-selection').innerHTML='';},6000);},
});
scene.update(toBuild(),state.installed);
scene.setRgb(state.rgb);
$('#scene-container').addEventListener('keydown',(event)=>{
  if(event.key.toLowerCase()==='e'){
    state.exploded=scene.exploded;
    $('#explode-button').classList.toggle('active',state.exploded);
    $('#explode-button').setAttribute('aria-pressed',state.exploded);
  }
  if(event.key.toLowerCase()==='l'){
    state.labels=scene.showLabels;
    $('#labels-button').classList.toggle('active',state.labels);
    $('#labels-button').setAttribute('aria-pressed',state.labels);
  }
});
if(initialNotice)setTimeout(()=>toast(initialNotice,'warning'),800);
window.addEventListener('beforeunload',()=>scene?.dispose());
