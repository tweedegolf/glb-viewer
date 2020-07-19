import { store, getState$ } from "./redux/store";
import { distinctUntilKeyChanged, map, pluck, pairwise } from "rxjs/operators";
import { World } from "./types";

export const setupObservers = (world: World) => {
  const state$ = getState$();
  // state$
  //   .pipe(
  //     distinctUntilKeyChanged("threeContainerDiv"),
  //     map(app => ({ div: app.threeContainerDiv }))
  //   )
  //   .subscribe(({ div }) => {
  //     if (div !== null) {
  //       console.log("append");
  //       div.appendChild(renderer.domElement);
  //     }
  //   });

  state$
    .pipe(
      distinctUntilKeyChanged("width"),
      map(app => ({
        width: app.width,
        height: app.height,
      }))
    )
    .subscribe(({ width, height }) => {
      world.resize(width, height);
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
      world.resize(width, height);
    });
};
