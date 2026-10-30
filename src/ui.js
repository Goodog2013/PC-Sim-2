import {
  createElement, Cpu, CircuitBoard, MemoryStick, HardDrive, Fan, Zap, PcCase,
  Search, Plus, X, ChevronDown, ArrowUpRight, Check, ArrowRight, RotateCcw, Layers3,
  Tag, PanelRightClose, Power, SlidersHorizontal, Bookmark, FolderOpen, Download,
  Upload, Link, CircleHelp, TriangleAlert, CircleCheck, ExternalLink, Trash2, Play,
  MousePointer2, Undo2, Redo2, Scale, Monitor, Cable, Droplets, Pencil, Maximize,
  Image, Heart, Menu, Settings2, Square, ChevronRight, LoaderCircle, Volume2,
} from 'lucide';

const Gpu = ['svg', Cpu[1], [
  ['rect', { x: 2, y: 6, width: 20, height: 12, rx: 2 }],
  ['circle', { cx: 8, cy: 12, r: 3 }],
  ['circle', { cx: 16, cy: 12, r: 3 }],
  ['path', { d: 'M5 18v3h6v-3M2 4v16' }],
]];

const icons = {
  cpu: Cpu, motherboard: CircuitBoard, ram: MemoryStick, gpu: Gpu, storage: HardDrive,
  cooler: Fan, psu: Zap, case: PcCase, search: Search, plus: Plus, x: X,
  chevron: ChevronDown, external: ArrowUpRight, check: Check, arrow: ArrowRight,
  reset: RotateCcw, explode: Layers3, labels: Tag, glass: PanelRightClose, power: Power,
  filters: SlidersHorizontal, save: Bookmark, folder: FolderOpen, download: Download,
  upload: Upload, link: Link, help: CircleHelp, warning: TriangleAlert, success: CircleCheck,
  source: ExternalLink, trash: Trash2, play: Play, mouse: MousePointer2, undo: Undo2,
  redo: Redo2, compare: Scale, benchmark: Monitor, cables: Cable, paste: Droplets,
  edit: Pencil, maximize: Maximize, image: Image, heart: Heart, menu: Menu,
  settings: Settings2, square: Square, next: ChevronRight, loading: LoaderCircle, sound: Volume2,
};

export function icon(name, size = 20) {
  const [tag, attrs, children] = icons[name] || Cpu;
  return createElement([tag, { ...attrs, width: size, height: size, 'stroke-width': 1.7, 'aria-hidden': 'true' }, children]).outerHTML;
}

export const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const money = (value) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value) + ' ₽';
export const number = (value) => new Intl.NumberFormat('ru-RU').format(value);

/** Original schematic illustrations, not manufacturer product photography. */
export function componentArt(product, className = '') {
  const id = `a-${product.id.replace(/[^a-zA-Z0-9-]/g, '')}`;
  const brand = escapeHtml(product.brand || 'PC LAB');
  const green = product.brand?.toLowerCase().includes('amd') ? '#d78959' : '#9fc66b';
  let drawing = '';
  const fan = (x, y, r = 16) => `<g transform="translate(${x} ${y})"><circle r="${r + 2}" fill="#151d22" stroke="#59646a" stroke-width="1.5"/><circle r="${r - 2}" fill="#283339"/>${Array.from({ length: 7 }, (_, i) => `<path d="M0 0C-${r * .35} -${r * .28} -${r * .3} -${r * .85} 0 -${r * .88}L${r * .25} -${r * .6}Z" fill="#657279" transform="rotate(${i * 51.43})"/>`).join('')}<circle r="4" fill="#20292f" stroke="#718087" stroke-width=".7"/></g>`;
  switch (product.category) {
    case 'cpu':
      drawing = `<g transform="translate(80 57) rotate(-13)"><rect x="-34" y="-34" width="68" height="68" rx="3" fill="#274b3d"/>${Array.from({ length: 13 }, (_, i) => `<path d="M${-29 + i * 4.7} -36v3M${-29 + i * 4.7} 33v3M-36 ${-29 + i * 4.7}h3M33 ${-29 + i * 4.7}h3" stroke="#bba679" stroke-width="1.5"/>`).join('')}<path d="M-26-28h52v8h4v39h-4v9h-52v-9h-4v-39h4Z" fill="url(#${id}-metal)" stroke="#a5acae"/><path d="M-21-22h42" stroke="#fbfcfc"/><text y="-5" text-anchor="middle" font-size="9" font-weight="800" fill="#555e63">${brand}</text><text y="7" text-anchor="middle" font-size="7" fill="#747b7c">${product.brand === 'AMD' ? 'RYZEN' : 'CORE'}</text><path d="M-16 17h32m-29 3h26" stroke="#919797" stroke-width=".7"/></g>`;
      break;
    case 'gpu':
      drawing = `<g transform="translate(16 33) rotate(-7 64 22)"><path d="M0 4h121l8 9v33H0Z" fill="#1e282e"/><path d="M4 0h115l10 10H0Z" fill="#5a6469"/><rect y="7" width="125" height="35" rx="3" fill="url(#${id}-dark)"/><path d="M1 42h120l-8 8H15Z" fill="#151d21"/><path d="M22 47h34v4H22Z" fill="#b79a56"/>${fan(27, 25, 15)}${fan(65, 25, 15)}${fan(103, 25, 15)}<path d="M0 8v35M5 4v35" stroke="#a9b0b2" stroke-width="2"/><path d="M94 4h24" stroke="${green}" stroke-width="2"/></g>`;
      break;
    case 'motherboard':
      drawing = `<g transform="translate(43 14) rotate(-6 36 42)"><rect width="75" height="86" rx="2" fill="#25312f" stroke="#18221f"/>${[4, 23, 42, 61].map(x => `<path d="M${x} 5v73h9" stroke="#59665c" stroke-width=".7"/>`).join('')}<rect x="20" y="18" width="25" height="28" rx="2" fill="#727c7b"/><rect x="23" y="21" width="19" height="22" fill="#424d4b"/>${[51, 57, 63].map(x => `<rect x="${x}" y="13" width="3.5" height="41" fill="#131b1b" stroke="#879083" stroke-width=".5"/>`).join('')}<rect x="2" y="4" width="13" height="39" fill="url(#${id}-dark)"/><rect x="19" y="4" width="28" height="9" fill="#5a6764"/><path d="M18 59h49M18 72h35" stroke="#aaa99c" stroke-width="4"/><rect x="47" y="64" width="24" height="14" fill="#3d4946"/><circle cx="31" cy="51" r="5" fill="#a1a9a4"/>${[[5,5],[69,5],[5,80],[69,80]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#a9ae9d"/>`).join('')}</g>`;
      break;
    case 'ram':
      drawing = `<g transform="translate(20 35) rotate(-14 60 20)">${[0, 18].map((y,i)=>`<g transform="translate(${i*5} ${y})"><path d="M0 2h111l8 7v17H0Z" fill="${i?'#263338':'#4b585b'}"/><path d="M3 0h107l9 7H0Z" fill="#7e8c87"/><path d="M7 2h99" stroke="#bddb8d" stroke-width="3"/><path d="M4 10h107M7 13h100" stroke="#6b7b78" stroke-width="1"/><text x="60" y="22" text-anchor="middle" font-size="7" font-weight="700" fill="#bec7c1">FURY / DDR${product.memoryType?.includes('5') ? 5 : 4}</text><path d="M10 27h43m5 0h48" stroke="#bda668" stroke-width="4"/></g>`).join('')}</g>`;
      break;
    case 'storage':
      drawing = `<g transform="translate(20 40) rotate(-13 60 16)"><rect width="120" height="34" rx="3" fill="#253b32"/><rect x="10" y="3" width="101" height="28" rx="2" fill="#242b2e"/><rect x="20" y="5" width="62" height="24" fill="#3a4243"/><text x="52" y="15" text-anchor="middle" font-size="7" fill="#e4e8e1" font-weight="700">${brand}</text><text x="52" y="24" text-anchor="middle" font-size="5" fill="#bdc8bd">NVMe · PCIe</text><rect x="89" y="7" width="17" height="20" fill="#202928"/><circle cx="4" cy="17" r="2.3" fill="#b9b6a0"/><path d="M118 5v23" stroke="#c0a060" stroke-width="5"/></g>`;
      break;
    case 'cooler':
      if (product.kind === 'aio') {
        drawing = `<g transform="translate(15 22)"><rect width="98" height="43" rx="3" fill="#333e42"/>${fan(25,22,17)}${fan(73,22,17)}<path d="M96 6C137 0 133 55 106 59M97 16C122 6 122 50 103 52" fill="none" stroke="#27322f" stroke-width="5"/><rect x="65" y="49" width="34" height="29" rx="8" fill="#434d4c"/><circle cx="82" cy="63" r="10" fill="#1e292a" stroke="#9fc66b" stroke-width="2"/></g>`;
      } else {
        drawing = `<g transform="translate(45 16)"><path d="M6 64v14h39V64" fill="none" stroke="#b69c73" stroke-width="5"/><path d="M0 6L20 0h43v65l-14 7H0Z" fill="#616d70"/>${Array.from({length:16},(_,i)=>`<path d="M1 ${7+i*3.5}h46l15-6" stroke="#b4bcba" stroke-width="1.6"/>`).join('')}<rect x="-4" y="10" width="51" height="55" rx="3" fill="#293439"/>${fan(21,37,22)}<path d="M0 14h42M0 61h42" stroke="#747e79" stroke-width="2"/></g>`;
      }
      break;
    case 'psu':
      drawing = `<g transform="translate(32 25)"><path d="M0 12L24 0h71v56L71 70H0Z" fill="#3b464b"/><path d="M0 12h71v58H0Z" fill="url(#${id}-dark)"/><path d="M71 12L95 0v56L71 70Z" fill="#4f5c5e"/>${fan(35,39,23)}<text x="82" y="30" text-anchor="middle" font-size="5" fill="#d3d9d1" transform="rotate(-29 82 30)">${product.watts}W</text><path d="M5 8h61" stroke="#818b87"/><path d="M76 43l14-8m-14 12l14-8m-14 12l14-8" stroke="#222e30" stroke-width="2"/></g>`;
      break;
    case 'case':
      drawing = `<g transform="translate(48 9)"><path d="M0 8L19 0h48v87l-18 8H0Z" fill="#303c41"/><path d="M1 9h48v85H1Z" fill="#637074"/><path d="M5 15h39v58H5Z" fill="#29383b"/><path d="M8 18h33v51H8Z" fill="#3d4d50" opacity=".9"/><path d="M49 9L67 0v87l-18 8Z" fill="#202c2e"/><path d="M52 15l10-4v63l-10 4Z" fill="#465452"/>${[25,45,65].map(y=>`<ellipse cx="57" cy="${y}" rx="5" ry="8" fill="#243633" stroke="#a4c782" stroke-width="1.5"/>`).join('')}<rect x="9" y="77" width="30" height="10" fill="#344245"/><path d="M6 96v4m39-4v4" stroke="#263231" stroke-width="4"/><circle cx="58" cy="6" r="1.2" fill="#a8c889"/></g>`;
      break;
  }
  return `<svg class="component-art ${className}" viewBox="0 0 160 112" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Схематичное изображение ${escapeHtml(product.name)}"><defs><linearGradient id="${id}-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0f2ef"/><stop offset=".5" stop-color="#c7cecb"/><stop offset="1" stop-color="#a1aaa6"/></linearGradient><linearGradient id="${id}-dark" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#4c595d"/><stop offset="1" stop-color="#252f35"/></linearGradient></defs><ellipse cx="80" cy="101" rx="47" ry="4" fill="#222e25" opacity=".06"/>${drawing}</svg>`;
}
