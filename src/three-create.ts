import {
  Object3D,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
  SpotLight,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Color,
  ClampToEdgeWrapping,
  LinearFilter,
  MeshPhysicalMaterial,
  Box3,
  Scene,
  AmbientLight,
  DirectionalLight,
  Vector2,
  PCFSoftShadowMap,
} from "three";

export const createCamera = (width: number, height: number): PerspectiveCamera => {
  const camera = new PerspectiveCamera(50, width / height, 20, 50000);
  camera.position.z = 200;
  camera.position.x = 0;
  camera.position.y = 100;
  camera.lookAt(new Vector3(0, 0, 0));
  return camera;
};

export const createRenderer = (canvas: HTMLCanvasElement): WebGLRenderer => {
  const renderer = new WebGLRenderer({ canvas });
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = sRGBEncoding;
  return renderer;
};

export const setUpLighting = (scene: Scene, maxSize: number) => {
  const ambientLight = new AmbientLight(0xfffce0, 0.5);
  const light = new DirectionalLight(0xfffce0, 1.3);

  // set the cube in which shadows are computed.
  light.shadow.camera.right = 2048;
  light.shadow.camera.left = -2048;
  light.shadow.camera.top = 2048;
  light.shadow.camera.bottom = -2048;

  light.shadow.camera.near = 100;
  light.shadow.camera.far = 8192;
  light.shadow.bias = -0.001;
  light.shadow.radius = 2;

  const size = Math.min(maxSize, 4096);
  light.shadow.mapSize = new Vector2(size, size);

  scene.add(ambientLight);
  scene.add(light);
};

export const createWorld = (): Mesh => {
  const world = new Mesh(
    new PlaneBufferGeometry(200, 200, 10, 10),
    new MeshBasicMaterial({ opacity: 1, color: 0x003300, wireframe: true })
  );
  world.rotation.x -= Math.PI / 2;
  world.position.y = 50;
  world.position.z = 50;
  world.receiveShadow = true;
  return world;
};

export const mirrorModel = (model: Object3D, mirror: boolean) => {
  if (mirror) {
    model.scale.x = -model.scale.x;
  }
};

export const removeModel = (model: Object3D, world: Mesh) => {
  world.remove(world.children[0]);
};

export const addModel = (model: Object3D, world: Mesh, mirror: boolean = false): void => {
  // console.log(model, world);
  model.scale.x = 100 / 2;
  model.scale.y = 100 / 2;
  model.scale.z = 100 / 2;

  model.traverse(obj => {
    if (obj instanceof Mesh) {
      const mesh = obj as Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (mesh.material) {
        const material = mesh.material as MeshPhysicalMaterial;
        // Note: as soon as we get multi-material models, we need to test if object.material
        // is an array an loop over all materials in that array!
        // console.log(Array.isArray(object.material));

        // for models without texture so that they disappear when the lights are off
        material.emissive = new Color(0, 0, 0).convertLinearToSRGB();
        // if (object.material.color) {
        //   object.material.color = object.material.color.convertSRGBToLinear(); // works only for 'siergras'
        //   console.log(object.material);
        // }
        if (material.map) {
          material.map.wrapS = ClampToEdgeWrapping;
          material.map.wrapT = ClampToEdgeWrapping;
          // console.log(object.material.map.wrapS, object.material.map.wrapT);
          material.map.minFilter = LinearFilter;

          material.alphaTest = 0.5;
          material.depthWrite = !material.transparent;
          // object.material.shadowSide = THREE.DoubleSide;
          // object.material.map.flipY = true; // -> breaks some models
          // object.material.side = THREE.DoubleSide; // -> handled by converter
        }
        material.needsUpdate = true;
      }
    }
  });

  mirrorModel(model, mirror);

  world.add(model);
};
