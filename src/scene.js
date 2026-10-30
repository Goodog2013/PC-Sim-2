import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FallbackPCScene } from './fallback-scene.js';

const ACCENT = '#c2f269';
const CATEGORIES = ['case', 'motherboard', 'cpu', 'ram', 'storage', 'cooler', 'gpu', 'psu'];
const TITLES = { case: 'Корпус', motherboard: 'Материнская плата', cpu: 'Процессор', ram: 'Оперативная память', storage: 'SSD', cooler: 'Охлаждение', gpu: 'Видеокарта', psu: 'Блок питания' };
const ANCHORS = {
  case: [1.02, 1.65, 1.4], motherboard: [-.7, .4, -.8], cpu: [-.53, .72, -.24],
  ram: [-.37, .7, .57], storage: [-.56, -.15, -.6], cooler: [.37, .76, -.24],
  gpu: [.65, -.36, .1], psu: [.15, -1.46, -.75],
};
const EXPLOSION = {
  case: [0, 0, 0], motherboard: [-.65, .12, -.15], cpu: [1.05, 1.35, -.75],
  ram: [1.25, .9, 1], storage: [1.5, -.1, -1.25], cooler: [2.15, .65, -.8],
  gpu: [1.4, -.25, .55], psu: [.7, -.55, 1.25],
};

/** Interactive, schematic hardware models. Dimensions are illustrative, not CAD models. */
export class PCScene {
  constructor(container, { onSelect = () => {}, onReady = () => {} } = {}) {
    this.container = container;
    this.onSelect = onSelect;
    this.onReady = onReady;
    this.build = {};
    this.groups = new Map();
    this.fanRotors = [];
    this.generatedTextures = new Set();
    this.materials = new Set();
    this.powered = false;
    this.exploded = false;
    this.showLabels = false;
    this.sidePanelVisible = false;
    this.rgb = new THREE.Color(ACCENT);
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.disposed = false;
    this.clock = new THREE.Clock();
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.tempVector = new THREE.Vector3();
    this.frame = 0;
    this.container.style.position = 'relative';

    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (_) {
      this.createFallback();
      queueMicrotask(() => this.onReady({ webgl: false }));
      return;
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setClearColor(0xf4f5f0, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;outline:none;touch-action:none;';
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.setAttribute('role', 'img');
    this.renderer.domElement.setAttribute('aria-label', 'Интерактивная 3D-сборка ПК. Вращайте мышью, масштабируйте колёсиком. Home — сброс ракурса, E — разборка, L — подписи.');
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf4f5f0, 17, 33);
    this.camera = new THREE.PerspectiveCamera(36, 1, .1, 80);
    this.homePosition = new THREE.Vector3(6.7, 3.6, 6.6);
    this.homeTarget = new THREE.Vector3(0, -.05, 0);
    this.camera.position.copy(this.homePosition);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.copy(this.homeTarget);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = .075;
    this.controls.enablePan = true;
    this.controls.minDistance = 4.1;
    this.controls.maxDistance = 16;
    this.controls.minPolarAngle = .22;
    this.controls.maxPolarAngle = Math.PI * .56;
    this.controls.rotateSpeed = .65;
    this.controls.zoomSpeed = .75;
    this.controls.addEventListener('start', () => { this.cameraTween = null; });

    this.createMaterials();
    this.createLighting();
    this.createFloor();
    this.hardware = new THREE.Group();
    this.scene.add(this.hardware);
    this.selectionBounds = new THREE.Box3();
    this.selectionHelper = new THREE.Box3Helper(this.selectionBounds, 0x86a73a);
    this.selectionHelper.material.transparent = true;
    this.selectionHelper.material.opacity = .5;
    this.selectionHelper.material.depthTest = false;
    this.selectionHelper.visible = false;
    this.selectionHelper.renderOrder = 10;
    this.scene.add(this.selectionHelper);

    this.createLabels();
    this.bindEvents();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.resize();
    this.update({});
    this.animate();
    queueMicrotask(() => this.onReady({ webgl: true }));
  }

  material(options) {
    const material = new THREE.MeshStandardMaterial(options);
    this.materials.add(material);
    return material;
  }

  createMaterials() {
    this.mat = {
      frame: this.material({ color: 0x252a2a, roughness: .53, metalness: .7 }),
      edge: this.material({ color: 0x4a5050, roughness: .38, metalness: .75 }),
      dark: this.material({ color: 0x121616, roughness: .8, metalness: .2 }),
      pcb: this.material({ color: 0x18312a, roughness: .8, metalness: .15 }),
      silver: this.material({ color: 0xa5acad, roughness: .31, metalness: .85 }),
      chrome: this.material({ color: 0xc8cdcb, roughness: .2, metalness: .9 }),
      blackMetal: this.material({ color: 0x303737, roughness: .48, metalness: .7 }),
      copper: this.material({ color: 0xc58b59, roughness: .32, metalness: .85 }),
      gold: this.material({ color: 0xb8a367, roughness: .38, metalness: .8 }),
      rubber: this.material({ color: 0x1a2020, roughness: .95, metalness: 0 }),
      white: this.material({ color: 0xd8ddd7, roughness: .4, metalness: .6 }),
      rgb: this.material({ color: 0x8ca15f, emissive: this.rgb, emissiveIntensity: .08, roughness: .28, metalness: .15 }),
      led: this.material({ color: 0x526346, emissive: this.rgb, emissiveIntensity: .08, roughness: .45 }),
      ghost: this.material({ color: 0x829174, transparent: true, opacity: .15, roughness: .8, wireframe: true }),
      glass: this.material({ color: 0x607b79, transparent: true, opacity: .15, roughness: .12, metalness: .2, depthWrite: false, side: THREE.DoubleSide }),
    };
  }

  createLighting() {
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x8b9487, 2.3));
    const key = new THREE.DirectionalLight(0xfffcf3, 4.1);
    key.position.set(4.5, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.camera.near = .5;
    key.shadow.camera.far = 25;
    key.shadow.normalBias = .035;
    key.shadow.bias = -.0003;
    key.shadow.radius = 4;
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xe8f0ff, 2.7);
    rim.position.set(-3, 4, -5);
    this.scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff, 1.45);
    fill.position.set(6, .5, -3);
    this.scene.add(fill);
    this.insideLight = new THREE.PointLight(0xc6ef58, 0, 5, 2);
    this.insideLight.position.set(.1, .4, .6);
    this.scene.add(this.insideLight);
  }

  createFloor() {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), this.material({ color: 0xf4f5f0, roughness: 1 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.055;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(128, 128, 18, 128, 128, 125);
    gradient.addColorStop(0, 'rgba(32,42,32,.32)');
    gradient.addColorStop(.5, 'rgba(32,42,32,.15)');
    gradient.addColorStop(1, 'rgba(32,42,32,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    this.generatedTextures.add(texture);
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
    this.materials.add(shadowMaterial);
    const contactShadow = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 6.6), shadowMaterial);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, -2.048, .1);
    this.scene.add(contactShadow);

    const grid = new THREE.GridHelper(28, 28, 0xd5d9ce, 0xdfe2d8);
    grid.position.y = -2.052;
    grid.material.transparent = true;
    grid.material.opacity = .42;
    grid.material.depthWrite = false;
    this.scene.add(grid);
  }

  box(group, dimensions, position, material = this.mat.dark, rotation) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...dimensions), material);
    mesh.position.set(...position);
    if (rotation) mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  cylinder(group, radius, depth, position, material = this.mat.dark, axis = 'y', segments = 32) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, segments), material);
    mesh.position.set(...position);
    if (axis === 'x') mesh.rotation.z = Math.PI / 2;
    if (axis === 'z') mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  screw(group, position, axis = 'x', radius = .028) {
    this.cylinder(group, radius, .018, position, this.mat.chrome, axis, 12);
    const groove = this.box(group, axis === 'x' ? [.021, radius * .25, radius * 1.3] : axis === 'z' ? [radius * 1.3, radius * .25, .021] : [radius * 1.3, .021, radius * .25], position, this.mat.dark);
    return groove;
  }

  text(group, text, width, height, position, { rotation = [0, Math.PI / 2, 0], color = '#d7ddd7', background = 'transparent', size = 50, font = '700', align = 'center' } = {}) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = Math.max(64, Math.round(1024 * height / width));
    const context = canvas.getContext('2d');
    if (background !== 'transparent') { context.fillStyle = background; context.fillRect(0, 0, canvas.width, canvas.height); }
    context.fillStyle = color;
    context.font = `${font} ${size}px Arial, sans-serif`;
    context.textAlign = align;
    context.textBaseline = 'middle';
    context.fillText(text, align === 'left' ? 20 : canvas.width / 2, canvas.height / 2, canvas.width - 30);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    this.generatedTextures.add(texture);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    this.materials.add(material);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
    label.position.set(...position);
    label.rotation.set(...rotation);
    label.userData.generatedLabel = true;
    group.add(label);
    return label;
  }

  fan(group, radius, position, axis = 'z', rgb = true, frame = true) {
    const fan = new THREE.Group();
    fan.position.set(...position);
    if (axis === 'x') fan.rotation.y = Math.PI / 2;
    if (axis === 'y') fan.rotation.x = -Math.PI / 2;
    group.add(fan);
    if (frame) {
      const r = radius + .06;
      this.box(fan, [r * 2, .065, .15], [0, r, 0], this.mat.dark);
      this.box(fan, [r * 2, .065, .15], [0, -r, 0], this.mat.dark);
      this.box(fan, [.065, r * 2, .15], [-r, 0, 0], this.mat.dark);
      this.box(fan, [.065, r * 2, .15], [r, 0, 0], this.mat.dark);
      for (const x of [-r + .04, r - .04]) for (const y of [-r + .04, r - .04]) this.screw(fan, [x, y, .083], 'z', .023);
    }
    const outer = new THREE.Mesh(new THREE.TorusGeometry(radius, .045, 8, 48), this.mat.blackMetal);
    fan.add(outer);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(radius - .04, .018, 8, 48), rgb ? this.mat.rgb : this.mat.silver);
    inner.position.z = .06;
    fan.add(inner);
    const rotor = new THREE.Group();
    rotor.position.z = .025;
    fan.add(rotor);
    for (let i = 0; i < 9; i++) {
      const shape = new THREE.Shape();
      const r = radius * .88;
      shape.moveTo(radius * .16, -.025);
      shape.bezierCurveTo(r * .5, -r * .11, r * .88, -r * .27, r, -r * .05);
      shape.bezierCurveTo(r * 1.03, r * .12, r * .72, r * .36, r * .35, r * .22);
      shape.lineTo(radius * .16, .035);
      shape.closePath();
      const blade = new THREE.Mesh(new THREE.ShapeGeometry(shape, 8), this.mat.blackMetal);
      blade.material.side = THREE.DoubleSide;
      blade.rotation.z = i * Math.PI * 2 / 9;
      rotor.add(blade);
    }
    this.cylinder(rotor, radius * .22, .07, [0, 0, .02], this.mat.rubber, 'z', 24);
    this.cylinder(rotor, radius * .105, .075, [0, 0, .03], this.mat.silver, 'z', 20);
    this.fanRotors.push({ rotor, owner: group, speed: 1 + this.fanRotors.length * .07 });
    return fan;
  }

  cable(group, points, radius = .025, material = this.mat.rubber) {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    const cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, radius, 6, false), material);
    cable.castShadow = true;
    group.add(cable);
    return cable;
  }

  createChassis(product, ghost = false) {
    const group = new THREE.Group();
    const frame = ghost ? this.mat.ghost : this.mat.frame;
    const shell = ghost ? this.mat.ghost : this.mat.dark;
    // Open side at +X: the opposite panel, rails and rear panel give a real hollow silhouette.
    this.box(group, [.07, 3.72, 3.4], [-.96, -.02, 0], frame);
    this.box(group, [2, .09, 3.45], [0, -1.86, 0], frame);
    this.box(group, [2, .08, 3.45], [0, 1.83, 0], frame);
    this.box(group, [2, 3.7, .07], [0, -.02, -1.72], frame);
    for (const x of [-.94, .94]) for (const z of [-1.65, 1.65]) this.box(group, [.07, 3.7, .07], [x, -.02, z], frame);
    for (const y of [-1.82, 1.8]) this.box(group, [.07, .07, 3.35], [.96, y, 0], frame);

    if (ghost) {
      this.text(group, 'ВЫБЕРИ КОРПУС', 2.1, .28, [.99, .35, 0], { color: '#81906e', size: 60 });
      return group;
    }
    // PSU shroud, perforated top, intake grille and separate front fascia.
    this.box(group, [1.86, .08, 3.23], [0, -1.07, -.02], this.mat.frame);
    this.box(group, [.045, .74, 3.23], [.91, -1.47, -.02], this.mat.frame);
    this.text(group, 'PC / LAB', 1.15, .19, [.938, -1.48, -.59], { color: '#a8b0a5', size: 76 });
    this.text(group, (product?.brand || 'WORKSTATION').toUpperCase(), 1.1, .11, [.939, -1.73, -.59], { color: '#727e75', size: 55, font: '400' });
    this.box(group, [2.04, 3.73, .08], [0, -.02, 1.76], this.mat.blackMetal);
    // Recessed face exposes the intake fans through a restrained wire grille.
    this.box(group, [1.54, 3.34, .085], [0, -.02, 1.815], this.mat.dark);
    for (const y of [1.11, -.02, -1.15]) this.fan(group, .47, [0, y, 1.88], 'z', true, false);
    for (let i = -8; i <= 8; i++) this.box(group, [.012, 3.42, .015], [i * .09, -.02, 1.975], this.mat.edge);
    for (let i = -17; i <= 17; i++) this.box(group, [1.55, .009, .015], [0, i * .096, 1.974], this.mat.edge);
    this.box(group, [.025, 3.4, .015], [.85, -.02, 1.81], this.mat.led);
    // Top radiator vent slots and recessed top I/O.
    for (let i = 0; i < 16; i++) this.box(group, [1.47, .012, .035], [-.08, 1.879, -1.24 + i * .135], this.mat.rubber);
    this.cylinder(group, .065, .015, [.51, 1.888, 1.21], this.mat.silver, 'y', 24);
    this.cylinder(group, .042, .018, [.51, 1.897, 1.21], this.mat.led, 'y', 24);
    for (const x of [-.2, .05]) this.box(group, [.15, .016, .065], [x, 1.887, 1.22], this.mat.dark);
    this.cylinder(group, .032, .014, [-.42, 1.888, 1.22], this.mat.dark, 'y', 20);
    // Feet and rear exhaust.
    for (const x of [-.7, .7]) for (const z of [-1.25, 1.25]) this.box(group, [.3, .16, .38], [x, -1.98, z], this.mat.rubber);
    const exhaust = this.fan(group, .36, [.25, 1.18, -1.65], 'z', false, true);
    exhaust.rotation.y = Math.PI;
    for (let i = 0; i < 6; i++) this.box(group, [.85, .045, .03], [.27, -.27 - i * .11, -1.665], this.mat.silver);
    for (const y of [-1.68, 1.65]) for (const z of [-1.52, 1.5]) this.screw(group, [.99, y, z], 'x');

    this.glassPanel = new THREE.Group();
    this.box(this.glassPanel, [.023, 3.5, 3.13], [1.01, -.01, -.02], this.mat.glass);
    this.box(this.glassPanel, [.034, .035, 3.17], [1.025, 1.75, -.02], this.mat.blackMetal);
    this.box(this.glassPanel, [.034, .035, 3.17], [1.025, -1.77, -.02], this.mat.blackMetal);
    this.glassPanel.visible = this.sidePanelVisible;
    group.add(this.glassPanel);
    return group;
  }

  createMotherboard(product) {
    const group = new THREE.Group();
    // Socket, DIMM and PCIe locations are shared with the separately selectable
    // component groups. Keep a coherent schematic footprint for every board:
    // shrinking just the PCB leaves its heatsinks and mounting screws floating.
    // Exact ATX/mATX fit is checked using catalog data, not this illustrative mesh.
    this.box(group, [.07, 2.5, 2.57], [-.805, .23, -.13], this.mat.pcb);
    // Copper traces are subtle linework on the board, with deterministic routing.
    const points = [];
    for (let i = 0; i < 28; i++) {
      const z = -1.23 + i * .086;
      const y = -.76 + (i % 6) * .12;
      points.push(-.763, y, z, -.763, y + .12, z, -.763, y + .12, z, -.763, y + .2, z + .08, -.763, y + .2, z + .08, -.763, .2 + (i % 4) * .08, z + .08);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const traceMaterial = new THREE.LineBasicMaterial({ color: 0x54715c, transparent: true, opacity: .55 });
    this.materials.add(traceMaterial);
    group.add(new THREE.LineSegments(geometry, traceMaterial));
    // Rear I/O shield and VRM heatsinks.
    this.box(group, [.3, 1.28, .3], [-.61, .72, -1.29], this.mat.blackMetal);
    this.box(group, [.025, .98, .21], [-.444, .78, -1.3], this.mat.silver);
    for (let i = 0; i < 6; i++) this.box(group, [.04, .035, .24], [-.41, .42 + i * .15, -1.3], this.mat.rubber);
    this.box(group, [.23, .26, 1.05], [-.64, 1.34, -.38], this.mat.blackMetal);
    this.box(group, [.24, .82, .25], [-.64, .76, -.9], this.mat.blackMetal);
    for (let i = 0; i < 8; i++) this.box(group, [.014, .27, .94], [-.746 + i * .027, 1.35, -.36], this.mat.silver);
    // Socket, lever and four DIMM sockets.
    this.box(group, [.065, .57, .57], [-.726, .72, -.24], this.mat.dark);
    this.box(group, [.035, .48, .48], [-.675, .72, -.24], this.mat.silver);
    this.cable(group, [[-.65, .43, -.53], [-.65, .44, -.56], [-.65, 1.02, -.56], [-.63, 1.08, -.48]], .012, this.mat.chrome);
    for (let i = 0; i < 4; i++) {
      this.box(group, [.13, 1.08, .052], [-.69, .74, .4 + i * .125], this.mat.dark);
      for (const y of [.16, 1.31]) this.box(group, [.16, .065, .068], [-.68, y, .4 + i * .125], this.mat.white);
    }
    // PCIe slot and chipset, battery, power connector.
    this.box(group, [.13, .07, 1.1], [-.69, -.38, -.48], this.mat.silver);
    this.box(group, [.15, .032, .98], [-.68, -.38, -.48], this.mat.dark);
    this.box(group, [.09, .05, .8], [-.71, -.71, -.57], this.mat.dark);
    this.box(group, [.14, .37, .4], [-.68, -.65, .58], this.mat.blackMetal);
    for (let i = 0; i < 5; i++) this.box(group, [.025, .37, .37], [-.73 + i * .035, -.65, .58], this.mat.silver);
    this.cylinder(group, .12, .045, [-.71, -.18, .61], this.mat.chrome, 'x', 32);
    this.box(group, [.19, .48, .12], [-.65, .57, .99], this.mat.dark);
    for (let i = 0; i < 8; i++) this.cylinder(group, .04, .1, [-.68, .36 + i * .12, -1.03], this.mat.silver, 'x', 12);
    for (const y of [-.91, 1.39]) for (const z of [-1.25, 1.02]) this.screw(group, [-.741, y, z], 'x');
    this.text(group, (product.brand || 'MAINBOARD').toUpperCase(), .76, .11, [-.716, -.06, -.7], { color: '#abb9a6', size: 72 });
    this.text(group, product.socket || 'SOCKET', .45, .08, [-.715, .03, .33], { color: '#708d76', size: 68 });
    for (let i = 0; i < 5; i++) {
      this.cable(group, [[-.51, .59 + i * .045, 1.03], [-.2, .59 + i * .045, 1.12], [.03, .3 + i * .035, 1.1], [.03, -.88, 1.07]], .026);
    }
    return group;
  }

  createCPU(product) {
    const group = new THREE.Group();
    this.box(group, [.028, .445, .445], [-.636, .72, -.24], this.mat.pcb);
    this.box(group, [.045, .369, .369], [-.605, .72, -.24], this.mat.chrome);
    this.text(group, product.brand?.toUpperCase() || 'CPU', .29, .065, [-.581, .77, -.24], { color: '#4a5350', size: 110 });
    const name = product.name.replace(/AMD |Intel |Core |Ryzen /g, '');
    this.text(group, name, .3, .055, [-.58, .68, -.24], { color: '#69716c', size: 78, font: '400' });
    return group;
  }

  createRAM(product) {
    const group = new THREE.Group();
    const count = Math.min(4, product.modules || 2);
    const slots = count === 1 ? [1] : count === 2 ? [1, 3] : [0, 1, 2, 3];
    for (const slot of slots) {
      const z = .4 + slot * .125;
      this.box(group, [.31, 1.08, .044], [-.48, .74, z], this.mat.pcb);
      this.box(group, [.29, 1.02, .055], [-.45, .76, z], this.mat.blackMetal);
      this.box(group, [.035, 1.03, .059], [-.293, .76, z], this.mat.rgb);
      for (let i = 0; i < 6; i++) this.box(group, [.015, .032, .064], [-.31, .35 + i * .14, z], this.mat.silver);
      this.text(group, (product.brand || 'DDR5').toUpperCase(), .6, .07, [-.272, .76, z + .031], { rotation: [Math.PI / 2, 0, Math.PI / 2], size: 72 });
    }
    return group;
  }

  createStorage(product) {
    const group = new THREE.Group();
    this.box(group, [.035, .19, .7], [-.682, -.1, -.72], this.mat.pcb);
    this.box(group, [.08, .18, .66], [-.624, -.1, -.72], this.mat.blackMetal);
    for (let i = 0; i < 7; i++) this.box(group, [.012, .17, .62], [-.66 + i * .014, -.1, -.72], this.mat.silver);
    const capacity = Number(product.capacity) || 1000;
    const capacityLabel = capacity >= 1000
      ? `${capacity / (capacity % 1024 === 0 ? 1024 : 1000)} TB`
      : `${capacity} GB`;
    this.text(group, `${product.brand || 'NVMe'} ${capacityLabel}`, .52, .07, [-.571, -.1, -.72], { color: '#29302c', size: 86 });
    this.screw(group, [-.575, -.1, -.35], 'x', .018);
    return group;
  }

  createCooler(product) {
    const group = new THREE.Group();
    const liquid = product.kind === 'aio' || product.type === 'aio' || !!product.radiator || /liquid|kraken|icue|aio|galahad|nucleus/i.test(product.name);
    if (liquid) {
      this.cylinder(group, .255, .2, [-.45, .72, -.24], this.mat.blackMetal, 'x', 48);
      this.cylinder(group, .21, .022, [-.335, .72, -.24], this.mat.dark, 'x', 48);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(.21, .014, 8, 48), this.mat.rgb);
      ring.rotation.y = Math.PI / 2;
      ring.position.set(-.319, .72, -.24);
      group.add(ring);
      this.text(group, product.brand?.toUpperCase() || 'AIO', .3, .065, [-.306, .72, -.24], { size: 100 });
      const fanCount = Number(product.radiator) >= 360 ? 3 : 2;
      const radiatorLength = fanCount === 3 ? 3.17 : 2.25;
      const radiatorCenter = -.04;
      const radiatorBack = radiatorCenter - radiatorLength / 2 + .1;
      const finCount = Math.ceil(radiatorLength / .1);
      this.box(group, [1.17, .14, radiatorLength], [.02, 1.62, radiatorCenter], this.mat.blackMetal);
      for (let i = 0; i < finCount; i++) {
        const z = radiatorCenter - radiatorLength / 2 + .08 + i * (radiatorLength - .16) / (finCount - 1);
        this.box(group, [1.08, .09, .014], [.02, 1.54, z], this.mat.silver);
      }
      for (let i = 0; i < fanCount; i++) {
        const z = radiatorCenter + (i - (fanCount - 1) / 2) * 1.02;
        this.fan(group, .44, [.02, 1.43, z], 'y', true, true);
      }
      this.cable(group, [[-.39, .82, -.43], [.11, .74, -.52], [.53, 1.04, -.7], [.4, 1.49, radiatorBack]], .05);
      this.cable(group, [[-.39, .59, -.43], [.21, .46, -.52], [.68, .83, -.75], [.52, 1.49, radiatorBack]], .05);
    } else {
      this.box(group, [.08, .38, .4], [-.53, .72, -.24], this.mat.copper);
      for (const z of [-.43, -.3, -.17, -.04]) {
        this.cable(group, [[-.49, .53, z], [-.18, .32, z], [.1, .44, z], [.1, 1.18, z]], .031, this.mat.copper);
      }
      for (let i = 0; i < 26; i++) this.box(group, [.65, .018, .76], [-.01, .34 + i * .031, -.24], i % 3 === 0 ? this.mat.chrome : this.mat.silver);
      this.box(group, [.68, .04, .79], [-.01, 1.16, -.24], this.mat.blackMetal);
      for (const z of [-.43, -.3, -.17, -.04]) this.cylinder(group, .04, .035, [.1, 1.195, z], this.mat.chrome, 'y', 16);
      this.fan(group, .39, [.395, .75, -.24], 'x', true, true);
      this.text(group, (product.brand || 'COOLER').toUpperCase(), .57, .08, [.338, 1.1, -.24], { color: '#cbd2c9', size: 75 });
    }
    return group;
  }

  createGPU(product) {
    const group = new THREE.Group();
    const length = Math.max(1.65, Math.min(2.9, (product.length || 285) / 115));
    const centerZ = -1.49 + length / 2;
    this.box(group, [1.36, .36, length], [.02, -.37, centerZ], this.mat.blackMetal);
    this.box(group, [1.34, .04, length - .03], [.02, -.155, centerZ], this.mat.silver);
    this.box(group, [1.25, .025, length - .12], [.02, -.127, centerZ], this.mat.dark);
    for (let i = 0; i < 22; i++) this.box(group, [1.25, .23, .02], [.02, -.37, centerZ - length / 2 + .1 + i * (length - .2) / 22], this.mat.silver);
    this.box(group, [.052, .31, length], [.73, -.36, centerZ], this.mat.blackMetal);
    this.box(group, [.02, .023, length * .78], [.762, -.24, centerZ], this.mat.led);
    this.box(group, [1.36, .04, length], [.02, -.58, centerZ], this.mat.dark);
    const fanCount = length > 2.35 ? 3 : 2;
    for (let i = 0; i < fanCount; i++) {
      const z = -1.49 + (i + .5) * length / fanCount;
      this.fan(group, Math.min(.39, length / fanCount * .42), [.05, -.102, z], 'y', false, false);
    }
    this.box(group, [1.49, .43, .04], [.015, -.36, -1.54], this.mat.silver);
    for (const x of [-.3, .04, .38]) this.box(group, [.2, .095, .045], [x, -.32, -1.568], this.mat.dark);
    const branding = /radeon/i.test(product.name) ? 'RADEON RX' : /arc/i.test(product.name) ? 'INTEL ARC' : /gtx/i.test(product.name) ? 'GEFORCE GTX' : 'GEFORCE RTX';
    this.text(group, branding, length * .68, .18, [.764, -.41, centerZ], { color: '#cbd4c7', size: 84 });
    this.text(group, product.brand?.toUpperCase() || 'GRAPHICS', length * .38, .08, [.765, -.53, centerZ], { color: '#82907f', size: 58 });
    for (let i = 0; i < 4; i++) this.cable(group, [[.62, -.3, centerZ + length * .32 + i * .04], [.9, -.48, centerZ + length * .3 + i * .04], [.77, -.94, centerZ + length * .22 + i * .04], [.24, -1.1, .75 + i * .04]], .025);
    // A discrete anti-sag support, because a three-slot card deserves a little dignity.
    this.cylinder(group, .035, .37, [.59, -.84, centerZ + length * .3], this.mat.blackMetal, 'y', 12);
    this.box(group, [.19, .035, .16], [.59, -.65, centerZ + length * .3], this.mat.rubber);
    return group;
  }

  createPSU(product) {
    const group = new THREE.Group();
    this.box(group, [1.5, .61, 1.35], [-.03, -1.46, -.88], this.mat.blackMetal);
    this.text(group, `${product.watts || 750} W`, .8, .24, [.735, -1.46, -.88], { color: '#d8dfce', size: 180 });
    this.text(group, (product.brand || 'POWER').toUpperCase(), .85, .1, [.736, -1.67, -.88], { color: '#8c9b88', size: 80 });
    this.box(group, [.29, .16, .05], [.37, -1.46, -1.584], this.mat.dark);
    this.box(group, [.12, .15, .05], [.62, -1.46, -1.585], this.mat.rubber);
    for (let i = 0; i < 11; i++) this.box(group, [.03, .42, .05], [-.64 + i * .063, -1.46, -1.582], this.mat.silver);
    for (let i = 0; i < 4; i++) this.cable(group, [[.1 + i * .07, -1.44, -.19], [.15 + i * .07, -1.5, .2], [.2 + i * .07, -1.3, .7], [-.3 + i * .07, -1.08, .92]], .033);
    return group;
  }

  createGhost(category) {
    const group = new THREE.Group();
    const sizes = { motherboard: [.055, 2.4, 2.55], cpu: [.07, .44, .44], ram: [.26, 1.04, .4], storage: [.06, .18, .68], cooler: [.65, .8, .7], gpu: [1.35, .33, 2.4], psu: [1.45, .6, 1.3] };
    const anchor = ANCHORS[category];
    const position = category === 'motherboard' ? [-.8, .23, -.13] : anchor;
    this.box(group, sizes[category], position, this.mat.ghost);
    return group;
  }

  update(build = {}, installed) {
    this.build = build;
    const selected = installed === undefined ? new Set(Object.keys(build).filter(key => !!build[key])) : new Set(installed);
    this.installed = selected;
    if (!this.renderer) { this.renderFallback(); return; }
    const creators = { case: 'createChassis', motherboard: 'createMotherboard', cpu: 'createCPU', ram: 'createRAM', storage: 'createStorage', cooler: 'createCooler', gpu: 'createGPU', psu: 'createPSU' };
    for (const category of CATEGORIES) {
      const product = build[category];
      const present = !!product && selected.has(category);
      const key = present ? `${product.id || product.name}:${product.revision || 0}` : '__empty__';
      const old = this.groups.get(category);
      if (old?.userData.productKey === key) continue;
      if (old) {
        this.hardware.remove(old);
        this.fanRotors = this.fanRotors.filter(fan => fan.owner !== old);
        this.disposeGroup(old);
      }
      const group = category === 'case' ? this.createChassis(product, !present) : present ? this[creators[category]](product) : this.createGhost(category);
      group.userData.category = category;
      group.userData.productKey = key;
      group.userData.present = present;
      group.userData.target = new THREE.Vector3(...(this.exploded ? EXPLOSION[category] : [0, 0, 0]));
      if (present && old && !this.reducedMotion) group.position.copy(group.userData.target).add(new THREE.Vector3(.5, .45, .12));
      else group.position.copy(group.userData.target);
      this.groups.set(category, group);
      this.hardware.add(group);
    }
    this.selectionHelper.visible = false;
    this.updateLabelText();
  }

  setPowered(powered) {
    this.powered = !!powered;
    if (!this.renderer) this.renderFallback();
  }

  setExploded(exploded) {
    this.exploded = !!exploded;
    if (!this.renderer) { this.fallbackScene?.setExploded(exploded); return; }
    for (const [category, group] of this.groups) group.userData.target.set(...(this.exploded ? EXPLOSION[category] : [0, 0, 0]));
    this.selectionHelper.visible = false;
    this.cameraTween = {
      position: this.exploded ? new THREE.Vector3(9.5, 5.6, 9.2) : this.homePosition.clone(),
      target: this.exploded ? new THREE.Vector3(.5, .08, .1) : this.homeTarget.clone(),
    };
  }

  setRgb(hex) {
    try { this.rgb.set(hex); } catch (_) { this.rgb.set(ACCENT); }
    if (!this.renderer) { this.fallbackScene?.setRgb(hex); return; }
    this.mat.rgb.emissive.copy(this.rgb);
    this.mat.led.emissive.copy(this.rgb);
    this.mat.rgb.color.copy(this.rgb).multiplyScalar(.7);
    this.insideLight.color.copy(this.rgb);
  }

  setSidePanel(visible) {
    this.sidePanelVisible = !!visible;
    this.fallbackScene?.setSidePanel(visible);
    if (this.glassPanel) this.glassPanel.visible = this.sidePanelVisible;
  }

  setLabels(visible) {
    this.showLabels = !!visible;
    this.fallbackScene?.setLabels(visible);
    if (this.labelLayer) this.labelLayer.style.display = this.showLabels ? 'block' : 'none';
  }

  resetCamera() {
    if (!this.renderer) { this.fallbackScene?.resetCamera(); return; }
    this.cameraTween = { position: this.homePosition.clone(), target: this.homeTarget.clone() };
    this.selectionHelper.visible = false;
  }

  /** Export the actual current WebGL view; no persistent drawing buffer required. */
  capture() {
    if (this.disposed) return null;
    if (!this.renderer) return this.fallbackScene?.capture() || null;
    try {
      this.renderer.render(this.scene, this.camera);
      const image = document.createElement('canvas');
      image.width = this.renderer.domElement.width;
      image.height = this.renderer.domElement.height;
      const context = image.getContext('2d');
      context.fillStyle = '#f4f5f0';
      context.fillRect(0, 0, image.width, image.height);
      context.drawImage(this.renderer.domElement, 0, 0);
      return image.toDataURL('image/png');
    } catch (_) {
      return null;
    }
  }

  focus(category) {
    if (!this.renderer) { this.fallbackScene?.focus(category); return; }
    const group = this.groups.get(category);
    if (!group) return;
    const target = new THREE.Vector3(...ANCHORS[category]).add(group.position);
    const direction = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
    const distance = category === 'case' ? 9.5 : 5.5;
    this.cameraTween = { position: target.clone().add(direction.multiplyScalar(distance)), target };
    this.highlight(category);
  }

  highlight(category) {
    const group = this.groups.get(category);
    if (!group) { this.selectionHelper.visible = false; return; }
    this.selectionBounds.setFromObject(group).expandByScalar(.035);
    this.selectionHelper.visible = category !== 'case';
  }

  createLabels() {
    this.labelLayer = document.createElement('div');
    this.labelLayer.className = 'scene-labels';
    this.labelLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;display:none;';
    this.labelButtons = new Map();
    for (const category of CATEGORIES) {
      const label = document.createElement('button');
      label.className = 'scene-component-label';
      label.type = 'button';
      label.style.cssText = 'position:absolute;transform:translate(-50%,-50%);pointer-events:auto;border:1px solid #cbd0c1;background:rgba(250,251,247,.94);color:#343d2e;border-radius:5px;padding:5px 8px;font:600 10px/1.2 sans-serif;white-space:nowrap;box-shadow:0 2px 6px #26302010;cursor:pointer;';
      label.textContent = TITLES[category];
      label.addEventListener('click', () => { this.focus(category); this.onSelect(category); });
      this.labelLayer.appendChild(label);
      this.labelButtons.set(category, label);
    }
    this.container.appendChild(this.labelLayer);
  }

  updateLabelText() {
    for (const [category, button] of this.labelButtons) {
      const present = this.installed.has(category) && this.build[category];
      button.textContent = present ? TITLES[category] : `+ ${TITLES[category]}`;
      button.title = present ? this.build[category].name : `Выбрать: ${TITLES[category]}`;
      button.style.opacity = present ? '1' : '.7';
    }
  }

  bindEvents() {
    const canvas = this.renderer.domElement;
    this.onPointerDown = event => { this.pointerStart = { x: event.clientX, y: event.clientY }; };
    this.onPointerUp = event => {
      if (!this.pointerStart || Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y) > 6) return;
      const category = this.pick(event);
      if (category) { this.highlight(category); this.onSelect(category); }
      this.pointerStart = null;
    };
    this.onPointerMove = event => {
      if (event.buttons) return;
      const category = this.pick(event);
      canvas.style.cursor = category ? 'pointer' : 'grab';
    };
    this.onKeyDown = event => {
      if (event.key === 'Home') { event.preventDefault(); this.resetCamera(); }
      if (event.key.toLowerCase() === 'e') this.setExploded(!this.exploded);
      if (event.key.toLowerCase() === 'l') this.setLabels(!this.showLabels);
      if (event.key === '+' || event.key === '=') { event.preventDefault(); this.camera.position.sub(this.controls.target).multiplyScalar(.88).add(this.controls.target); }
      if (event.key === '-') { event.preventDefault(); this.camera.position.sub(this.controls.target).multiplyScalar(1.12).add(this.controls.target); }
    };
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('keydown', this.onKeyDown);
    this.onContextLost = event => {
      event.preventDefault();
      cancelAnimationFrame(this.frame);
      this.contextNotice = document.createElement('div');
      this.contextNotice.textContent = '3D-предпросмотр приостановлен. Каталог и сборка продолжают работать. Перезагрузи страницу, чтобы вернуть 3D.';
      this.contextNotice.style.cssText = 'position:absolute;bottom:40px;left:10%;right:10%;padding:16px;border-radius:10px;background:#fff9e8;color:#695321;font:13px/1.5 sans-serif;';
      this.container.appendChild(this.contextNotice);
    };
    canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.onContextRestored = () => { this.contextNotice?.remove(); this.animate(); };
    canvas.addEventListener('webglcontextrestored', this.onContextRestored);
  }

  pick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.hardware.children, true);
    for (const hit of hits) {
      let object = hit.object;
      if (object.material === this.mat.glass || object.userData.generatedLabel) continue;
      while (object && !object.userData.category) object = object.parent;
      if (object?.userData.category) return object.userData.category;
    }
    return null;
  }

  resize() {
    if (!this.renderer) return;
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight || 500);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(36) / 2) * Math.max(1, .85 / this.camera.aspect)));
    this.camera.updateProjectionMatrix();
  }

  animate = () => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.animate);
    const delta = Math.min(this.clock.getDelta(), .06);
    const smooth = this.reducedMotion ? 1 : 1 - Math.exp(-9 * delta);
    for (const group of this.groups.values()) group.position.lerp(group.userData.target, smooth);
    if (this.cameraTween) {
      this.camera.position.lerp(this.cameraTween.position, smooth * .65);
      this.controls.target.lerp(this.cameraTween.target, smooth * .65);
      if (this.camera.position.distanceTo(this.cameraTween.position) < .01) this.cameraTween = null;
    }
    const intensity = this.powered ? 1.85 : .06;
    this.mat.rgb.emissiveIntensity = THREE.MathUtils.lerp(this.mat.rgb.emissiveIntensity, intensity, smooth);
    this.mat.led.emissiveIntensity = this.mat.rgb.emissiveIntensity;
    this.insideLight.intensity = THREE.MathUtils.lerp(this.insideLight.intensity, this.powered ? 2.7 : 0, smooth);
    if (this.powered && !this.reducedMotion) for (const fan of this.fanRotors) fan.rotor.rotation.z -= delta * 5.8 * fan.speed;
    this.controls.update();
    if (this.showLabels) {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      for (const [category, button] of this.labelButtons) {
        this.tempVector.set(...ANCHORS[category]).add(this.groups.get(category)?.position || new THREE.Vector3());
        this.tempVector.project(this.camera);
        button.style.left = `${(this.tempVector.x * .5 + .5) * width}px`;
        button.style.top = `${(-this.tempVector.y * .5 + .5) * height}px`;
        button.style.visibility = this.tempVector.z > 1 ? 'hidden' : 'visible';
      }
    }
    this.renderer.render(this.scene, this.camera);
  };

  createFallback() {
    this.fallbackScene = new FallbackPCScene(this.container, { onSelect: this.onSelect });
  }

  renderFallback() {
    this.fallbackScene?.update(this.build, this.installed);
    this.fallbackScene?.setPowered(this.powered);
  }

  disposeGroup(group) {
    group.traverse(object => {
      object.geometry?.dispose();
      if (object.userData.generatedLabel) {
        const texture = object.material.map;
        texture?.dispose();
        this.generatedTextures.delete(texture);
        object.material.dispose();
        this.materials.delete(object.material);
      } else if (object.isLineSegments && object.material) {
        object.material.dispose();
        this.materials.delete(object.material);
      }
    });
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.controls?.dispose();
    if (this.renderer) {
      const canvas = this.renderer.domElement;
      canvas.removeEventListener('pointerdown', this.onPointerDown);
      canvas.removeEventListener('pointerup', this.onPointerUp);
      canvas.removeEventListener('pointermove', this.onPointerMove);
      canvas.removeEventListener('keydown', this.onKeyDown);
      canvas.removeEventListener('webglcontextlost', this.onContextLost);
      canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
      this.scene.traverse(object => object.geometry?.dispose());
      for (const material of this.materials) material.dispose();
      for (const texture of this.generatedTextures) texture.dispose();
      this.renderer.dispose();
      canvas.remove();
    }
    this.labelLayer?.remove();
    this.fallbackScene?.dispose();
    this.fallback?.remove();
    this.contextNotice?.remove();
  }
}

export default PCScene;
