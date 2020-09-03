import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "./styles/index.scss";
import { store } from "./redux/store";
import { RESIZE } from "./constants";
import { ThreeContainer } from "./components/ThreeContainer";
import { setupObservers } from "./observers";
import { createWorld } from "./world";
import { Canvas, useFrame } from "react-three-fiber";

render(
  <Provider store={store}>
    <div className="top">TOP</div>
    <ThreeContainer></ThreeContainer>
  </Provider>,
  document.getElementById("app"),
  () => {
    console.log(store.getState().threeContainerDiv);
  }
);

const world = createWorld();
setupObservers(world);

window.addEventListener("resize", () => {
  store.dispatch({
    type: RESIZE,
    payload: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });
});
