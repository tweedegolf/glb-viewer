export type RootState = {
  width: number;
  height: number;
  // threeContainerDiv: HTMLDivElement;
  threeContainerDiv: any;
};

export type World = {
  resize: (width: number, height: number) => void;
  render: () => void;
  scene: THREE.Scene;
  world: THREE.Object3D;
};
