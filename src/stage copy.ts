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
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { store, getState$ } from "./redux/store";
import { distinctUntilKeyChanged, map, pluck, pairwise } from "rxjs/operators";

export const initStage = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 20);

  // camera.position.z = 200;
  // camera.position.x = 0;
  // camera.position.y = 100;
  // camera.lookAt(new Vector3(0, 0, 0));

  const renderer = new WebGLRenderer();
  // renderer.setClearColor(0xffffff, 1);
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
  // world.receiveShadow = true;
  // scene.add(world);

  const render = () => {
    console.log("render");
    renderer.render(scene, camera);
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
  // scene.add(light.target);

  const resize = (width: number, height: number) => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const gltfLoader = new GLTFLoader();
  // const url = "output/Laurierblok_80_80_80.gltf";
  // const url = "output/Buxusblok_80_80_80.gltf";
  const url = "output/Buxusblok_80_80_80.glb";
  // const url = "output2/1a7d841d38bd4cefeba6-kliko-groen.gltf";
  gltfLoader.load(url, gltf => {
    const root = gltf.scene;
    root.scale.x = 10;
    root.scale.y = 10;
    root.scale.z = 10;
    scene.add(root);
    root.traverse(function(child) {
      if (child.type === "Mesh") {
        ((child as Mesh).material as any).alphaTest = 0.6;
        // ((child as Mesh).material as any).texture = 0.6;
        console.log((child as Mesh).material);
      }
    });
    render();
  });

  const state$ = getState$();
  state$
    .pipe(
      distinctUntilKeyChanged("threeContainerDiv"),
      map(app => ({ div: app.threeContainerDiv }))
    )
    .subscribe(({ div }) => {
      if (div !== null) {
        console.log("append");
        div.appendChild(renderer.domElement);
      }
    });

  state$
    .pipe(
      distinctUntilKeyChanged("width"),
      map(app => ({
        width: app.width,
        height: app.height,
      }))
    )
    .subscribe(({ width, height }) => {
      resize(width, height);
    });

  state$
    .pipe(
      distinctUntilKeyChanged("height"),
      map(app => ({
        width: app.width,
        height: app.height,
      }))
    )
    .subscribe(({ width, height }) => {
      resize(width, height);
    });
};
