import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PCFSoftShadowMap,
  Vector3,
  SpotLight,
  Object3D,
  PlaneBufferGeometry,
  sRGBEncoding,
  HemisphereLight,
  Material,
} from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { World } from "./types";

export const createWorld = (): World => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 200;
  camera.position.x = 0;
  camera.position.y = 100;
  camera.lookAt(new Vector3(0, 0, 0));

  // const fov = 45;
  // const aspect = 2; // the canvas default
  // const near = 0.1;
  // const far = 100;
  // const camera = new PerspectiveCamera(fov, aspect, near, far);
  // camera.position.set(0, 10, 20);

  const renderer = new WebGLRenderer();
  renderer.setClearColor(0xffffff, 1);
  // renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = sRGBEncoding;
  console.log(sRGBEncoding);

  const spot = new SpotLight(0xffffff, 1);
  spot.position.set(300, 300, 300);
  spot.target.position.set(0, 0, 0);
  spot.shadowCameraNear = 1;
  spot.shadowCameraFar = 1024;
  spot.castShadow = true;
  // spot.shadowDarkness = 0.3;
  spot.shadowBias = 0.0001;
  spot.shadowMapWidth = 2048;
  spot.shadowMapHeight = 2048;
  // scene.add(spot);

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
  scene.add(world);

  const render = () => {
    // console.log("render");
    renderer.render(scene, camera);
    // requestAnimationFrame(render);
  };

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  // controls.minDistance = -0.1;
  // controls.maxDistance = 100;
  controls.target.set(0, 5, 0);
  controls.update();

  const color = 0xffffff;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);
  light.position.set(5, 10, 2);
  scene.add(light);
  scene.add(light.target);

  const resize = (width: number, height: number) => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };

  const light2 = new HemisphereLight(0xffffff, 0x000000, 0.6);
  scene.add(light2);

  const gltfLoader = new GLTFLoader();
  // const url = "output/Laurierblok_80_80_80.gltf";
  const url = "output/Buxusblok_80_80_180.glb";
  // const url = "output/Laurierblok_80_80_80.glb";
  // const url = "output/Kliko-geel.glb";
  // const url = "output2/1a7d841d38bd4cefeba6-kliko-groen.gltf";
  gltfLoader.load(url, gltf => {
    const root = gltf.scene;
    root.scale.x = 10;
    root.scale.y = 10;
    root.scale.z = 10;
    world.add(root);
    root.traverse(function(child) {
      if (child.type === "Mesh") {
        const material = (child as Mesh).material as Material;
        material.alphaTest = 0.5;
        material.side = THREE.DoubleSide;
        // ((child as Mesh).material as any).texture = 0.6;
        console.log((child as Mesh).material);
      }
    });
    render();
  });

  return {
    world,
    scene,
    render,
    resize,
  };
};
