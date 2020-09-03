import {
  Object3D,
  Scene,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
  SpotLight,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useStore3D, Store3D } from "./store-3d";

export type ThreeManager = {
  render: () => void;
  addObject: (o: Object3D) => void;
};

const createCamera = (width: number, height: number): PerspectiveCamera => {
  // const fov = 45;
  // const aspect = 2; // the canvas default
  // const near = 0.1;
  // const far = 100;
  // const camera = new PerspectiveCamera(fov, aspect, near, far);
  // camera.position.set(0, 10, 20);

  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 200;
  camera.position.x = 0;
  camera.position.y = 100;
  camera.lookAt(new Vector3(0, 0, 0));
  return camera;
};

const createRenderer = (canvas: HTMLCanvasElement): WebGLRenderer => {
  const renderer = new WebGLRenderer({ canvas });
  // renderer.setClearColor(0xffffff, 1);
  // renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = sRGBEncoding;
  // console.log(sRGBEncoding);
  return renderer;
};

const createSpot = () => {
  // const spot = new SpotLight(0xffffff, 1);
  // spot.position.set(300, 300, 300);
  // spot.target.position.set(0, 0, 0);
  // spot.shadowCameraNear = 1;
  // spot.shadowCameraFar = 1024;
  // spot.castShadow = true;
  // // spot.shadowDarkness = 0.3;
  // spot.shadowBias = 0.0001;
  // spot.shadowMapWidth = 2048;
  // spot.shadowMapHeight = 2048;
};

const createWorld = (): Mesh => {
  // const world = new Object3D();
  const world = new Mesh(
    new PlaneBufferGeometry(200, 200, 10, 10),
    // new MeshBasicMaterial({ opacity: 1, color: 0x003300 })
    new MeshBasicMaterial({ opacity: 1, color: 0x003300, wireframe: true })
  );
  world.rotation.x -= Math.PI / 2;
  // world.rotation.x += Math.PI / 2;
  // world.rotation.x += Math.PI;
  world.position.y = 50;
  world.position.z = 50;
  world.receiveShadow = true;
  return world;
};

export const createThreeManager = (canvas: HTMLCanvasElement): void => {
  let raqId: number;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scene = new Scene();
  const camera = createCamera(width, height);
  const renderer = createRenderer(canvas);
  const world = createWorld();

  // scene.add(spot);
  scene.add(world);
  scene.add(camera);

  useStore3D.subscribe(
    ({ width, height }) => {
      canvas.width = width;
      canvas.height = height;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    (state: Store3D) => {
      return { width: state.width, height: state.height };
    }
  );
  useStore3D.setState({ width: window.innerWidth, height: window.innerHeight, canvas });

  const controls = new OrbitControls(camera, renderer.domElement);

  const render = () => {
    renderer.render(scene, camera);
    raqId = requestAnimationFrame(render);
  };
  render();

  // const addObject = (o: Object3D) => {};

  // return {
  //   render,
  //   addObject,
  // };
};
