import React, { useEffect, RefObject, useRef } from "react";
import { useStore, Store } from "../store";

export const ThreeContainer = (): JSX.Element => {
  const ref: RefObject<HTMLDivElement> = useRef();
  // const dispatch = useDispatch();
  const width = useStore((state: Store) => state.width);
  const height = useStore((state: Store) => state.height);
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };
  console.log(width, height);
  useEffect(() => {
    if (ref.current) {
      console.log("update");
      // dispatch(setThreeContainerRef(ref.current));
    }
  }, [ref.current]);

  return (
    <div id="three-container" style={style} ref={ref}>
      THREE
    </div>
  );
};
