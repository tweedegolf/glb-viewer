import { Object3D, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useStore3D, Store3D } from "./store-3d";
import {
  createCamera,
  createRenderer,
  createWorld,
  addModel,
  mirrorModel,
  setUpLighting,
} from "./three-create";

export type ThreeManager = {
  render: () => void;
  addObject: (o: Object3D) => void;
};

export const createThreeManager = (canvas: HTMLCanvasElement): void => {
  let raqId: number;
  let modelId: string;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scene = new Scene();
  const camera = createCamera(width, height);
  const renderer = createRenderer(canvas);
  const world = createWorld();
  const controls = new OrbitControls(camera, renderer.domElement);

  scene.add(world);
  scene.add(camera);
  setUpLighting(scene, renderer.capabilities.maxTextureSize);

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

  useStore3D.subscribe(
    ({ model, mirror }) => {
      if (model === null) {
        return;
      } else if (model.uuid === modelId) {
        mirrorModel(model, mirror);
      } else {
        addModel(model, world, mirror);
      }
    },
    (state: Store3D) => ({ model: state.model, mirror: state.mirror })
  );

  const render = () => {
    renderer.render(scene, camera);
    raqId = requestAnimationFrame(render);
  };
  render();
};
