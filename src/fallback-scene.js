/**
 * Canvas2D software projection for devices without WebGL.
 * The geometry is deliberately schematic, but rotation, depth, assembly,
 * RGB, picking and exported views are all rendered from live component state.
 */

const ORDER = ['case', 'motherboard', 'cpu', 'ram', 'storage', 'cooler', 'gpu', 'psu'];
const NAMES = { case: 'Корпус', motherboard: 'Плата', cpu: 'Процессор', ram: 'Память', storage: 'SSD', cooler: 'Охлаждение', gpu: 'Видеокарта', psu: 'Блок питания' };
const ANCHORS = { case: [.95, 1.7, 1.55], motherboard: [-.77, .25, -.65], cpu: [-.55, .75, -.25], ram: [-.4, .75, .64], storage: [-.55, -.12, -.72], cooler: [.4, .75, -.25], gpu: [.8, -.4, -.2], psu: [.7, -1.48, -.9] };
const EXPLODE = { case: [0, 0, 0], motherboard: [-.65, .1, -.2], cpu: [.9, 1.25, -.7], ram: [1.1, .8, .95], storage: [1.3, -.15, -1.15], cooler: [1.9, .6, -.8], gpu: [1.25, -.22, .45], psu: [.65, -.5, 1.15] };
const PAL = { frame: '#434a4b', dark: '#22292c', black: '#30393b', pcb: '#253e35', metal: '#b0b9b6', silver: '#d1d7d3', rubber: '#222b2c', gold: '#b9a66d', copper: '#b79771' };
const add = (a, b) => a.map((n, i) => n + b[i]);
const dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);
const scale = (a, value) => a.map(n => n * value);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const hex = value => /^#[0-9a-f]{6}$/i.test(value) ? value : '#b5ef78';
function shade(color, amount) {
  const number = parseInt(color.slice(1), 16);
  return `rgb(${[number >> 16 & 255, number >> 8 & 255, number & 255].map(channel => Math.round(clamp(channel * amount, 0, 255))).join(',')})`;
}
function contains(points, x, y) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if ((a.y > y) !== (b.y > y) && x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

export class FallbackPCScene {
  constructor(container, { onSelect = () => {} } = {}) {
    this.container = container;
    this.onSelect = onSelect;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'software-scene-canvas';
    this.canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab;';
    this.canvas.tabIndex = 0;
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', 'Программная 3D-схема сборки ПК. Перетаскивай для вращения, используй колесо для масштаба.');
    this.context = this.canvas.getContext('2d', { alpha: false });
    container.appendChild(this.canvas);
    this.groups = new Map();
    this.build = {};
    this.installed = new Set();
    this.powered = false;
    this.exploded = false;
    this.labels = false;
    this.glass = false;
    this.rgb = '#b5ef78';
    this.yaw = .92;
    this.pitch = .3;
    this.zoom = 1;
    this.distance = 11.6;
    this.targetDistance = 11.6;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pointers = new Map();
    this.hitAreas = [];
    this.labelHits = [];
    this.dirty = true;
    this.angle = 0;
    this.disposed = false;
    this.bind();
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(container);
    this.resize();
    this.update({});
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  resize() {
    this.width = Math.max(1, this.container.clientWidth);
    this.height = Math.max(1, this.container.clientHeight || 500);
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.dirty = true;
    this.render();
  }

  box(items, size, position, color = PAL.black, options = {}) {
    const [a, b, c] = size.map(n => n / 2);
    const faces = [
      [[1, 0, 0], [[a, -b, -c], [a, -b, c], [a, b, c], [a, b, -c]]],
      [[-1, 0, 0], [[-a, -b, c], [-a, -b, -c], [-a, b, -c], [-a, b, c]]],
      [[0, 1, 0], [[-a, b, -c], [a, b, -c], [a, b, c], [-a, b, c]]],
      [[0, -1, 0], [[-a, -b, c], [a, -b, c], [a, -b, -c], [-a, -b, -c]]],
      [[0, 0, 1], [[-a, -b, c], [-a, b, c], [a, b, c], [a, -b, c]]],
      [[0, 0, -1], [[a, -b, -c], [a, b, -c], [-a, b, -c], [-a, -b, -c]]],
    ];
    for (const [normal, vertices] of faces) items.push({ type: 'poly', points: vertices.map(p => add(p, position)), normal, color, ...options });
  }

  line(items, points, color = PAL.rubber, width = .025, options = {}) {
    items.push({ type: 'line', points, color, width, ...options });
  }

  text(items, text, position, width, height, color = '#c2cdc1', axis = 'x') {
    items.push({ type: 'text', text, position, width, height, color, axis });
  }

  fan(items, position, radius, axis = 'z', rgb = true, options = {}) {
    const dims = axis === 'x' ? [.13, radius * 2.16, radius * 2.16] : axis === 'y' ? [radius * 2.16, .12, radius * 2.16] : [radius * 2.16, radius * 2.16, .12];
    if (options.frame !== false) this.box(items, dims, position, PAL.dark);
    const offset = axis === 'x' ? [.075, 0, 0] : axis === 'y' ? [0, .075, 0] : [0, 0, .075];
    items.push({ type: 'fan', position: add(position, offset), radius, axis, rgb, speed: options.speed || 1 });
  }

  chassis(items, p, present) {
    const options = present ? {} : { ghost: true };
    const color = present ? PAL.frame : '#aebca0';
    this.box(items, [.06, 3.75, 3.4], [-.97, -.01, 0], color, options);
    this.box(items, [2, .08, 3.45], [0, 1.84, 0], color, options);
    this.box(items, [2, .09, 3.45], [0, -1.85, 0], color, options);
    this.box(items, [1.98, 3.7, .07], [0, -.02, -1.72], color, options);
    for (const z of [-1.65, 1.65]) for (const x of [-.95, .95]) this.box(items, [.075, 3.7, .075], [x, 0, z], color, options);
    for (const y of [-1.81, 1.8]) this.box(items, [.07, .07, 3.35], [.96, y, 0], color, options);
    if (!present) return;
    this.box(items, [1.87, .065, 3.22], [0, -1.06, -.02], PAL.frame);
    this.box(items, [.045, .75, 3.22], [.92, -1.47, -.02], PAL.frame);
    this.box(items, [2.01, 3.73, .08], [0, -.02, 1.76], PAL.frame);
    this.box(items, [1.6, 3.39, .025], [0, -.02, 1.812], '#1e2729');
    for (const y of [1.1, -.02, -1.14]) this.fan(items, [0, y, 1.835], .48, 'z', true, { frame: false });
    for (let x = -.72; x < .75; x += .12) this.line(items, [[x, -1.68, 1.93], [x, 1.66, 1.93]], '#657270', .008, { opacity: .52 });
    for (let y = -1.62; y < 1.65; y += .12) this.line(items, [[-.76, y, 1.93], [.76, y, 1.93]], '#657270', .005, { opacity: .4 });
    this.line(items, [[.85, -1.68, 1.82], [.85, 1.65, 1.82]], '@rgb', .018);
    this.text(items, 'PC / LAB', [.951, -1.4, -.62], 1.1, .17, '#a7b1a4');
    this.text(items, (p.brand || 'WORKSTATION').toUpperCase(), [.952, -1.67, -.64], 1.0, .075, '#85917d');
    for (let z = -1.35; z < .85; z += .13) this.box(items, [1.45, .008, .027], [-.07, 1.886, z], PAL.dark);
    this.box(items, [.14, .012, .14], [.52, 1.893, 1.2], '#707c71');
    this.box(items, [.082, .016, .082], [.52, 1.9, 1.2], '@rgb');
    this.box(items, [.14, .015, .055], [.08, 1.89, 1.2], PAL.dark);
    this.box(items, [.14, .015, .055], [-.17, 1.89, 1.2], PAL.dark);
    for (const x of [-.72, .72]) for (const z of [-1.3, 1.3]) this.box(items, [.28, .16, .33], [x, -1.98, z], PAL.rubber);
    this.fan(items, [.25, 1.14, -1.62], .36, 'z', false);
    for (let i = 0; i < 6; i++) this.box(items, [.85, .035, .025], [.22, -.25 - i * .13, -1.67], '#8b9890');
  }

  motherboard(items, p) {
    this.box(items, [.055, 2.53, 2.56], [-.79, .21, -.15], PAL.pcb);
    for (let i = 0; i < 29; i++) {
      const z = -1.27 + i * .082;
      this.line(items, [[-.756, -.85, z], [-.756, -.65 + i % 4 * .12, z], [-.756, -.53 + i % 4 * .12, z + .07], [-.756, .22 + i % 3 * .09, z + .07]], '#67856b', .008, { opacity: .7 });
    }
    this.box(items, [.28, 1.28, .29], [-.61, .74, -1.3], PAL.black);
    this.box(items, [.026, 1.05, .21], [-.451, .78, -1.3], '#87968f');
    for (let i = 0; i < 6; i++) this.box(items, [.025, .035, .23], [-.433, .36 + i * .16, -1.3], PAL.dark);
    this.box(items, [.23, .23, .98], [-.64, 1.35, -.38], '#818d87');
    for (let i = 0; i < 8; i++) this.line(items, [[-.73 + i * .026, 1.48, -.83], [-.73 + i * .026, 1.48, .05]], '#d0d8ce', .009);
    this.box(items, [.24, .77, .23], [-.64, .76, -.92], PAL.black);
    this.box(items, [.065, .56, .55], [-.72, .74, -.25], PAL.dark);
    this.box(items, [.04, .49, .48], [-.67, .74, -.25], PAL.metal);
    this.line(items, [[-.64, .46, -.55], [-.64, 1.04, -.55], [-.61, 1.09, -.48]], PAL.silver, .016);
    for (let i = 0; i < 4; i++) {
      const z = .41 + i * .12;
      this.box(items, [.12, 1.08, .047], [-.68, .75, z], PAL.dark);
      for (const y of [.17, 1.33]) this.box(items, [.15, .06, .06], [-.67, y, z], '#9ba794');
    }
    this.box(items, [.13, .055, 1.13], [-.68, -.37, -.48], PAL.metal);
    this.box(items, [.14, .025, .99], [-.67, -.37, -.48], PAL.dark);
    this.box(items, [.1, .052, .85], [-.7, -.74, -.58], PAL.dark);
    this.box(items, [.12, .35, .43], [-.68, -.64, .54], '#63726b');
    for (let i = 0; i < 5; i++) this.box(items, [.015, .35, .4], [-.72 + i * .026, -.64, .54], '#a4b1a2');
    this.box(items, [.07, .2, .2], [-.69, -.15, .59], PAL.metal);
    this.box(items, [.19, .47, .12], [-.64, .57, 1.0], PAL.dark);
    for (let i = 0; i < 7; i++) this.box(items, [.12, .07, .07], [-.68, .28 + i * .14, -1.04], PAL.metal);
    for (let i = 0; i < 5; i++) this.line(items, [[-.52, .5 + i * .055, 1.06], [-.16, .5 + i * .045, 1.17], [.03, .08 + i * .035, 1.18], [.03, -1.03, 1.1]], '#252e2c', .042, { curve: true });
    this.text(items, (p.brand || 'MAINBOARD').toUpperCase(), [-.726, .09, -.7], .75, .09, '#94ac89');
    for (const y of [-.91, 1.39]) for (const z of [-1.26, 1.04]) this.box(items, [.028, .046, .046], [-.741, y, z], PAL.gold);
  }

  cpu(items, p) {
    this.box(items, [.035, .44, .44], [-.62, .74, -.25], PAL.pcb);
    this.box(items, [.04, .37, .37], [-.59, .74, -.25], PAL.silver);
    this.text(items, (p.brand || 'CPU').toUpperCase(), [-.568, .77, -.25], .28, .065, '#667367');
    this.text(items, p.name.replace(/AMD |Intel |Core |Ryzen /g, ''), [-.567, .69, -.25], .3, .045, '#7c867c');
  }

  ram(items, p) {
    const modules = Math.min(4, p.modules || 2);
    const slots = modules === 1 ? [1] : modules === 2 ? [1, 3] : [0, 1, 2, 3];
    for (const i of slots) {
      const z = .41 + i * .12;
      this.box(items, [.31, 1.06, .045], [-.48, .75, z], PAL.pcb);
      this.box(items, [.28, 1.0, .055], [-.45, .77, z], '#394540');
      this.box(items, [.032, 1.0, .06], [-.289, .77, z], '@rgb');
      for (let j = 0; j < 6; j++) this.line(items, [[-.312, .36 + j * .14, z - .028], [-.4, .41 + j * .14, z - .028]], '#96a48b', .012);
    }
  }

  storage(items, p) {
    this.box(items, [.03, .18, .69], [-.68, -.1, -.73], PAL.pcb);
    this.box(items, [.085, .17, .65], [-.625, -.1, -.73], '#8a978c');
    for (let i = 0; i < 7; i++) this.line(items, [[-.67 + i * .014, -.02, -1.03], [-.67 + i * .014, -.02, -.42]], '#d0d8c8', .009);
    this.text(items, `${p.brand || 'NVMe'} / ${p.capacity || 1000} GB`, [-.578, -.1, -.73], .57, .06, '#435741');
  }

  cooler(items, p) {
    if (p.kind === 'aio' || p.radiator) {
      this.box(items, [.23, .46, .46], [-.43, .74, -.25], '#303c37');
      this.box(items, [.025, .35, .35], [-.3, .74, -.25], '@rgb');
      this.box(items, [.03, .29, .29], [-.28, .74, -.25], '#26332a');
      this.text(items, (p.brand || 'AIO').toUpperCase(), [-.263, .74, -.25], .27, .06, '#c2d7b3');
      this.box(items, [1.28, .13, 2.53], [.03, 1.61, -.16], '#535f56');
      for (const z of [-.79, .49]) this.fan(items, [.03, 1.5, z], .5, 'y', true);
      this.line(items, [[-.38, .87, -.43], [.6, .54, -.6], [.73, 1.25, -.75], [.54, 1.59, -1.15]], '#28342c', .075, { curve: true });
      this.line(items, [[-.38, .6, -.43], [.63, .3, -.6], [.92, 1.1, -.9], [.73, 1.59, -1.15]], '#354235', .075, { curve: true });
      return;
    }
    this.box(items, [.08, .37, .38], [-.53, .74, -.25], PAL.copper);
    for (const z of [-.46, -.32, -.18, -.04]) this.line(items, [[-.5, .55, z], [-.18, .27, z], [.11, .42, z], [.11, 1.19, z]], PAL.copper, .047, { curve: true });
    for (let i = 0; i < 24; i++) this.box(items, [.64, .016, .75], [-.015, .36 + i * .032, -.25], i % 3 === 0 ? '#d1d8cd' : '#a7b2a4');
    this.box(items, [.66, .04, .79], [-.015, 1.14, -.25], '#626f61');
    for (const z of [-.46, -.32, -.18, -.04]) this.box(items, [.065, .03, .065], [.11, 1.18, z], '#cad3c3');
    this.fan(items, [.38, .75, -.25], .39, 'x', true);
  }

  gpu(items, p) {
    const length = clamp((p.length || 285) / 115, 1.6, 2.9);
    const z = -1.49 + length / 2;
    this.box(items, [1.35, .36, length], [.03, -.4, z], '#424e47');
    for (let i = 0; i < 23; i++) this.box(items, [1.27, .23, .014], [.03, -.4, z - length / 2 + .08 + i * (length - .16) / 23], '#9aa895');
    this.box(items, [1.36, .035, length], [.03, -.195, z], '#717e6f');
    this.box(items, [1.29, .026, length - .07], [.03, -.167, z], '#2d3b30');
    this.box(items, [.06, .35, length], [.752, -.39, z], '#364335');
    this.line(items, [[.788, -.255, z - length * .42], [.788, -.255, z + length * .42]], '@rgb', .023);
    this.box(items, [1.35, .03, length], [.03, -.6, z], '#222e25');
    const n = length > 2.35 ? 3 : 2;
    for (let i = 0; i < n; i++) this.fan(items, [.05, -.145, -1.49 + (i + .5) * length / n], Math.min(.38, length / n * .42), 'y', false, { frame: false, speed: 1.3 });
    this.box(items, [1.46, .43, .025], [.015, -.4, -1.54], '#9ba798');
    for (const x of [-.3, .02, .34]) this.box(items, [.19, .075, .035], [x, -.37, -1.561], '#29382a');
    this.text(items, /radeon/i.test(p.name) ? 'RADEON RX' : /arc/i.test(p.name) ? 'INTEL ARC' : /gtx/i.test(p.name) ? 'GEFORCE GTX' : 'GEFORCE RTX', [.79, -.4, z], length * .71, .14, '#c8d2bf');
    this.text(items, (p.brand || 'GRAPHICS').toUpperCase(), [.791, -.53, z], length * .4, .055, '#83977a');
    for (let i = 0; i < 4; i++) this.line(items, [[.63, -.3, z + length * .34 + i * .035], [.98, -.48, z + length * .3 + i * .035], [.86, -.94, .8 + i * .035], [.17, -1.15, .8 + i * .035]], '#253124', .04, { curve: true });
    this.box(items, [.05, .42, .055], [.61, -.85, z + length * .3], '#576950');
    this.box(items, [.17, .04, .16], [.61, -.63, z + length * .3], '#263627');
  }

  psu(items, p) {
    this.box(items, [1.48, .61, 1.34], [-.03, -1.47, -.89], '#3f4c3c');
    this.text(items, `${p.watts || 750} W`, [.727, -1.43, -.89], .83, .22, '#c8d8ba');
    this.text(items, (p.brand || 'POWER').toUpperCase(), [.728, -1.67, -.89], .8, .07, '#96aa84');
    for (let i = 0; i < 10; i++) this.box(items, [.025, .42, .018], [-.65 + i * .07, -1.47, -1.57], '#9aab8b');
    this.box(items, [.27, .15, .024], [.37, -1.47, -1.57], '#1f2c20');
    for (let i = 0; i < 4; i++) this.line(items, [[.08 + i * .07, -1.4, -.19], [.25 + i * .07, -1.58, .24], [.35 + i * .07, -1.21, .73], [-.24 + i * .07, -1.06, .98]], '#293927', .045, { curve: true });
  }

  update(build = {}, installed) {
    this.build = build;
    this.installed = installed === undefined ? new Set(Object.keys(build).filter(k => build[k])) : new Set(installed);
    for (const category of ORDER) {
      const p = build[category];
      const present = p && this.installed.has(category);
      const key = present ? `${p.id || p.name}:${p.revision || 0}` : 'empty';
      const prior = this.groups.get(category);
      if (prior?.key === key) continue;
      const items = [];
      if (category === 'case') this.chassis(items, p || {}, present);
      else if (present) this[category](items, p);
      else {
        const sizes = { motherboard: [.05, 2.4, 2.5], cpu: [.055, .4, .4], ram: [.2, 1.0, .32], storage: [.055, .16, .66], cooler: [.6, .76, .7], gpu: [1.3, .3, 2.3], psu: [1.4, .58, 1.3] };
        this.box(items, sizes[category], category === 'motherboard' ? [-.78, .23, -.13] : ANCHORS[category], '#b0bca3', { ghost: true });
      }
      this.groups.set(category, { key, items, present, offset: present && prior && !this.reducedMotion ? [.32, .25, .1] : [0, 0, 0] });
    }
    this.dirty = true;
  }

  basis(axis) {
    return axis === 'x' ? { u: [0, 0, -1], v: [0, 1, 0], n: [1, 0, 0] }
      : axis === 'y' ? { u: [1, 0, 0], v: [0, 0, 1], n: [0, 1, 0] }
      : { u: [1, 0, 0], v: [0, 1, 0], n: [0, 0, 1] };
  }

  project(point) {
    const p = [point[0] - (this.exploded ? .45 : 0), point[1] + .04, point[2]];
    const depth = Math.max(2, this.distance - dot(p, this.view));
    const k = this.focal / depth;
    return { x: this.width * .49 + dot(p, this.right) * k, y: this.height * .445 - dot(p, this.up) * k, depth, scale: k };
  }

  color(value) { return value === '@rgb' ? this.powered ? this.rgb : '#849b67' : value; }

  path(points, close = true) {
    const ctx = this.context;
    ctx.beginPath();
    points.forEach((p, index) => index ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    if (close) ctx.closePath();
  }

  render() {
    const ctx = this.context;
    if (!ctx || this.disposed) return;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    const bg = ctx.createLinearGradient(0, 0, 0, this.height);
    bg.addColorStop(0, '#f5f6f1'); bg.addColorStop(1, '#f0f3e9');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, this.width, this.height);
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw), sp = Math.sin(this.pitch), cp = Math.cos(this.pitch);
    this.view = [sy * cp, sp, cy * cp];
    this.right = [cy, 0, -sy];
    this.up = [-sy * sp, cp, -cy * sp];
    this.focal = Math.min(this.height * 1.9, this.width * 2.2) * this.zoom;
    this.drawFloor();
    const commands = [];
    for (const [category, group] of this.groups) {
      for (const item of group.items) {
        if (item.type === 'poly' && dot(item.normal, this.view) < -.03) continue;
        if (item.type === 'fan' && dot(this.basis(item.axis).n, this.view) < .02) continue;
        const points = item.points?.map(p => this.project(add(p, group.offset)));
        const position = item.position ? this.project(add(item.position, group.offset)) : null;
        const depth = position?.depth || points.reduce((sum, p) => sum + p.depth, 0) / points.length;
        commands.push({ ...item, category, offset: group.offset, projected: points, projectedPosition: position, depth });
      }
    }
    if (this.glass && this.groups.get('case')?.present) {
      const points = [[1.025, -1.76, -1.58], [1.025, 1.73, -1.58], [1.025, 1.73, 1.56], [1.025, -1.76, 1.56]].map(p => this.project(p));
      if (this.view[0] > 0) commands.push({ type: 'poly', category: 'glass', projected: points, depth: points.reduce((s, p) => s + p.depth, 0) / 4, color: '#a2c5bc', opacity: .17, normal: [1, 0, 0], glass: true });
    }
    commands.sort((a, b) => b.depth - a.depth);
    this.hitAreas.length = 0;
    for (const command of commands) {
      if (command.type === 'poly') this.drawPolygon(command);
      else if (command.type === 'line') this.drawLine(command);
      else if (command.type === 'fan') this.drawFan(command);
      else if (command.type === 'text') this.drawText(command);
    }
    this.drawLabels();
    if (this.focused && Date.now() < this.focusUntil) this.drawFocus();
    this.dirty = false;
  }

  drawFloor() {
    const ctx = this.context;
    ctx.lineWidth = .65;
    ctx.strokeStyle = '#bac7ad';
    ctx.globalAlpha = .23;
    for (let i = -8; i <= 8; i++) {
      this.path([this.project([i, -2.06, -8]), this.project([i, -2.06, 8])], false); ctx.stroke();
      this.path([this.project([-8, -2.06, i]), this.project([8, -2.06, i])], false); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const center = this.project([.1, -2.035, .15]);
    const r = this.focal / this.distance * 2.5;
    ctx.save();
    ctx.translate(center.x, center.y - 3);
    ctx.scale(1, .28);
    const shadow = ctx.createRadialGradient(0, 0, r * .06, 0, 0, r);
    shadow.addColorStop(0, 'rgba(50,66,37,.28)'); shadow.addColorStop(.42, 'rgba(50,66,37,.16)'); shadow.addColorStop(1, 'rgba(50,66,37,0)');
    ctx.fillStyle = shadow; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  drawPolygon(item) {
    const ctx = this.context;
    this.path(item.projected);
    const brightness = .67 + .39 * Math.max(0, dot(item.normal, [.35, .82, .44]));
    const color = this.color(item.color);
    ctx.globalAlpha = item.opacity ?? 1;
    if (item.ghost) {
      ctx.globalAlpha = .18;
      ctx.fillStyle = '#d3ddc8'; ctx.fill();
      ctx.globalAlpha = .5; ctx.strokeStyle = '#a5b597'; ctx.lineWidth = .65; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
    } else {
      const top = Math.min(...item.projected.map(p => p.y)), bottom = Math.max(...item.projected.map(p => p.y));
      const gradient = ctx.createLinearGradient(0, top, 0, Math.max(top + 1, bottom));
      gradient.addColorStop(0, shade(color, brightness * 1.12)); gradient.addColorStop(1, shade(color, brightness * .88));
      ctx.fillStyle = gradient; ctx.fill();
      ctx.strokeStyle = item.glass ? '#d6ede1' : 'rgba(202,220,190,.16)';
      ctx.lineWidth = item.glass ? 1 : .5; ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (item.category !== 'glass') this.hitAreas.push({ category: item.category, points: item.projected });
  }

  drawLine(item) {
    const ctx = this.context, pts = item.projected;
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    if (item.curve && pts.length === 4) ctx.bezierCurveTo(pts[1].x, pts[1].y, pts[2].x, pts[2].y, pts[3].x, pts[3].y);
    else for (const p of pts.slice(1)) ctx.lineTo(p.x, p.y);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(.4, item.width * this.focal / item.depth);
    ctx.globalAlpha = item.opacity ?? 1;
    ctx.strokeStyle = this.color(item.color); ctx.stroke(); ctx.globalAlpha = 1;
  }

  drawFan(item) {
    const ctx = this.context;
    const basis = this.basis(item.axis), p = add(item.position, item.offset), origin = item.projectedPosition;
    const u = this.project(add(p, scale(basis.u, item.radius))), v = this.project(add(p, scale(basis.v, item.radius)));
    ctx.save();
    ctx.transform(u.x - origin.x, u.y - origin.y, v.x - origin.x, v.y - origin.y, origin.x, origin.y);
    let gradient = ctx.createRadialGradient(-.2, .25, .1, 0, 0, 1);
    gradient.addColorStop(0, '#475448'); gradient.addColorStop(.65, '#29352c'); gradient.addColorStop(1, '#17221b');
    ctx.beginPath(); ctx.arc(0, 0, 1, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill();
    ctx.strokeStyle = '#687561'; ctx.lineWidth = .055; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, .9, 0, Math.PI * 2);
    ctx.strokeStyle = item.rgb ? this.powered ? this.rgb : '#8a9d72' : '#8b9a7d';
    ctx.lineWidth = item.rgb ? .038 : .018;
    if (item.rgb && this.powered) { ctx.shadowColor = this.rgb; ctx.shadowBlur = 4; }
    ctx.stroke(); ctx.shadowBlur = 0;
    ctx.save(); ctx.rotate(this.angle * item.speed);
    for (let i = 0; i < 9; i++) {
      ctx.rotate(Math.PI * 2 / 9); ctx.beginPath(); ctx.moveTo(.12, -.02);
      ctx.bezierCurveTo(.34, -.09, .73, -.35, .84, -.09);
      ctx.bezierCurveTo(.96, .14, .58, .4, .27, .21); ctx.lineTo(.12, .06); ctx.closePath();
      const blade = ctx.createLinearGradient(.1, -.2, .8, .25); blade.addColorStop(0, '#62725b'); blade.addColorStop(1, '#34432e');
      ctx.fillStyle = blade; ctx.fill(); ctx.strokeStyle = '#7c8b6d'; ctx.lineWidth = .01; ctx.stroke();
    }
    ctx.restore();
    gradient = ctx.createRadialGradient(-.04, .05, .01, 0, 0, .23);
    gradient.addColorStop(0, '#b0bda3'); gradient.addColorStop(.35, '#829375'); gradient.addColorStop(1, '#3c5035');
    ctx.beginPath(); ctx.arc(0, 0, .22, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 0, .075, 0, Math.PI * 2); ctx.fillStyle = '#293b25'; ctx.fill();
    ctx.restore();
    const hit = Array.from({ length: 16 }, (_, i) => this.project(add(p, add(scale(basis.u, Math.cos(i / 8 * Math.PI) * item.radius), scale(basis.v, Math.sin(i / 8 * Math.PI) * item.radius)))));
    this.hitAreas.push({ category: item.category, points: hit });
  }

  drawText(item) {
    const ctx = this.context;
    const basis = this.basis(item.axis);
    if (dot(basis.n, this.view) < .1) return;
    const pos = add(item.position, item.offset);
    const leftTop = add(pos, add(scale(basis.u, -item.width / 2), scale(basis.v, item.height / 2)));
    const a = this.project(leftTop), b = this.project(add(leftTop, scale(basis.u, item.width))), c = this.project(add(leftTop, scale(basis.v, -item.height)));
    ctx.save();
    ctx.transform((b.x - a.x) / 500, (b.y - a.y) / 500, (c.x - a.x) / 90, (c.y - a.y) / 90, a.x, a.y);
    ctx.font = '700 68px Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = item.color;
    ctx.fillText(item.text, 250, 45, 490); ctx.restore();
  }

  drawLabels() {
    this.labelHits.length = 0;
    if (!this.labels) return;
    const ctx = this.context;
    for (const [category, group] of this.groups) {
      const position = this.project(add(ANCHORS[category], group.offset));
      const text = `${group.present ? '' : '+ '}${NAMES[category]}`;
      ctx.font = '600 9px Arial, sans-serif';
      const width = ctx.measureText(text).width + 16, height = 22;
      const x = clamp(position.x - width / 2, 6, this.width - width - 6), y = clamp(position.y - 11, 42, this.height - 80);
      ctx.fillStyle = 'rgba(250,254,243,.95)'; ctx.strokeStyle = '#b8cba4'; ctx.lineWidth = .7;
      ctx.beginPath(); ctx.roundRect(x, y, width, height, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#68844e'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x + width / 2, y + 11);
      this.labelHits.push({ category, points: [{ x, y }, { x: x + width, y }, { x: x + width, y: y + height }, { x, y: y + height }] });
    }
  }

  drawFocus() {
    const group = this.groups.get(this.focused);
    if (!group) return;
    const point = this.project(add(ANCHORS[this.focused], group.offset));
    const ctx = this.context;
    ctx.beginPath(); ctx.arc(point.x, point.y, 7, 0, Math.PI * 2); ctx.strokeStyle = '#b2d587'; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.beginPath(); ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2); ctx.fillStyle = '#a7cf77'; ctx.fill();
  }

  bind() {
    this.down = event => {
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      this.canvas.setPointerCapture(event.pointerId);
      this.start = { x: event.clientX, y: event.clientY };
      this.dragged = false; this.canvas.style.cursor = 'grabbing';
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()]; this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: this.zoom };
      }
    };
    this.move = event => {
      const previous = this.pointers.get(event.pointerId);
      if (!previous) return;
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.pointers.size === 2 && this.pinch) {
        const [a, b] = [...this.pointers.values()];
        this.zoom = clamp(this.pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, this.pinch.distance), .65, 1.7);
      } else {
        this.yaw -= (event.clientX - previous.x) * .008;
        this.pitch = clamp(this.pitch + (event.clientY - previous.y) * .006, -.12, 1.15);
      }
      if (Math.hypot(event.clientX - this.start.x, event.clientY - this.start.y) > 4) this.dragged = true;
      this.dirty = true;
    };
    this.up = event => {
      if (!this.dragged && this.pointers.size === 1) {
        const rect = this.canvas.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top;
        const hit = [...this.hitAreas, ...this.labelHits].reverse().find(item => contains(item.points, x, y));
        if (hit) { this.focus(hit.category); this.onSelect(hit.category); }
      }
      this.pointers.delete(event.pointerId); this.pinch = null;
      this.canvas.style.cursor = 'grab';
    };
    this.wheel = event => { event.preventDefault(); this.zoom = clamp(this.zoom * Math.exp(-event.deltaY * .0011), .65, 1.7); this.dirty = true; };
    this.key = event => {
      const key = event.key;
      if (['Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-', '='].includes(key)) event.preventDefault();
      if (key === 'Home') this.resetCamera();
      if (key === 'ArrowLeft') this.yaw -= .15;
      if (key === 'ArrowRight') this.yaw += .15;
      if (key === 'ArrowUp') this.pitch = clamp(this.pitch + .1, -.12, 1.15);
      if (key === 'ArrowDown') this.pitch = clamp(this.pitch - .1, -.12, 1.15);
      if (key === '+' || key === '=') this.zoom = clamp(this.zoom * 1.1, .65, 1.7);
      if (key === '-') this.zoom = clamp(this.zoom / 1.1, .65, 1.7);
      this.dirty = true;
    };
    this.canvas.addEventListener('pointerdown', this.down);
    this.canvas.addEventListener('pointermove', this.move);
    this.canvas.addEventListener('pointerup', this.up);
    this.canvas.addEventListener('pointercancel', this.up);
    this.canvas.addEventListener('wheel', this.wheel, { passive: false });
    this.canvas.addEventListener('keydown', this.key);
  }

  loop(now) {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    if (this.lastFrame && now - this.lastFrame < 32) return;
    const delta = Math.min(.08, (now - (this.lastFrame || now)) / 1000);
    this.lastFrame = now;
    let changing = false;
    const smoothing = this.reducedMotion ? 1 : 1 - Math.exp(-8 * delta);
    this.distance += (this.targetDistance - this.distance) * smoothing;
    if (Math.abs(this.targetDistance - this.distance) > .01) changing = true;
    for (const [category, group] of this.groups) {
      const target = this.exploded ? EXPLODE[category] : [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        if (Math.abs(target[i] - group.offset[i]) > .001) { group.offset[i] += (target[i] - group.offset[i]) * smoothing; changing = true; }
        else group.offset[i] = target[i];
      }
    }
    if (this.powered && !this.reducedMotion) { this.angle -= delta * 5; changing = true; }
    if (this.dirty || changing) this.render();
  }

  setPowered(value) { this.powered = !!value; this.dirty = true; }
  setExploded(value) { this.exploded = !!value; this.targetDistance = value ? 13.3 : 11.6; this.dirty = true; }
  setRgb(value) { this.rgb = hex(value); this.dirty = true; }
  setSidePanel(value) { this.glass = !!value; this.dirty = true; }
  setLabels(value) { this.labels = !!value; this.dirty = true; }
  resetCamera() { this.yaw = .92; this.pitch = .3; this.zoom = 1; this.focused = null; this.dirty = true; }
  focus(category) { this.focused = category; this.focusUntil = Date.now() + 4500; this.dirty = true; }
  capture() { this.render(); return this.canvas.toDataURL('image/png'); }
  dispose() {
    this.disposed = true; cancelAnimationFrame(this.raf); this.observer.disconnect();
    for (const [event, handler] of [['pointerdown', this.down], ['pointermove', this.move], ['pointerup', this.up], ['pointercancel', this.up], ['wheel', this.wheel], ['keydown', this.key]]) this.canvas.removeEventListener(event, handler);
    this.canvas.remove();
  }
}
