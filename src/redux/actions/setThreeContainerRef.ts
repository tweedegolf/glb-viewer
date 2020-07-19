import { SET_THREE_CONTAINER } from "../../constants";

export const setThreeContainerRef = (div: HTMLDivElement) => {
  return {
    type: SET_THREE_CONTAINER,
    payload: {
      div,
    },
  };
};
