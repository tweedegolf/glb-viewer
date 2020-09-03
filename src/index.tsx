import React, { Suspense } from "react";
import { render } from "react-dom";
// import { Provider } from "react-redux";
import "./styles/index.scss";
// import { store } from "./redux/store";
// import { RESIZE } from "./constants";
// import { ThreeContainer } from "./components/ThreeContainer";
// import { setupObservers } from "./observers";
// import { createWorld } from "./world";
import { Canvas, extend } from "react-three-fiber";
import { Model } from "./Model";
import { Cube } from "./Cube";

render(
  <Canvas>
    <ambientLight />
    <OrbitControls />
    <pointLight position={[10, 10, 10]} />
    <Suspense fallback={<Cube position={[-1.2, 0, 0]} />}>
      <Model url="./alleenstaandeboom.1.glb" />
    </Suspense>
  </Canvas>,
  document.getElementById("app")
);

// render(
//   <Provider store={store}>
//     <div className="top">TOP</div>
//     <ThreeContainer></ThreeContainer>
//   </Provider>,
//   document.getElementById("app"),
//   () => {
//     console.log(store.getState().threeContainerDiv);
//   }
// );

// const world = createWorld();
// setupObservers(world);

// window.addEventListener("resize", () => {
//   store.dispatch({
//     type: RESIZE,
//     payload: {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     },
//   });
// });
