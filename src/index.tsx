import React, { Suspense } from "react";
import { render } from "react-dom";
import { useStore } from "./store";
// import { Provider } from "react-redux";
import "./styles/index.scss";
// import { store } from "./redux/store";
// import { RESIZE } from "./constants";
import { ThreeContainer } from "./components/ThreeContainer";
// import { setupObservers } from "./observers";
// import { createWorld } from "./world";

const resize = () => {
  useStore.setState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
};

render(
  <>
    <ThreeContainer></ThreeContainer>
  </>,
  document.getElementById("app"),
  resize
);

// const world = createWorld();
// setupObservers(world);

window.addEventListener("resize", resize);
