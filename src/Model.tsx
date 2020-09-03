import React, { Suspense } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export const Model = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url, (loader: GLTFLoader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });
  console.log(gltf);

  return <primitive object={gltf.scene} dispose={null} />;
};
