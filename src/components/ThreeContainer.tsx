import React, { useEffect, RefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThreeContainerRef } from "../redux/actions/setThreeContainerRef";
import { RootState } from "../types";

export const ThreeContainer = (): JSX.Element => {
  const ref: RefObject<HTMLDivElement> = useRef();
  const dispatch = useDispatch();
  const width = useSelector((state: RootState) => state.width);
  const height = useSelector((state: RootState) => state.height);
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  useEffect(() => {
    if (ref.current) {
      console.log("update");
      dispatch(setThreeContainerRef(ref.current));
    }
  }, [ref.current]);

  return (
    <div id="three-container" style={style} ref={ref}>
      THREE
    </div>
  );
};
