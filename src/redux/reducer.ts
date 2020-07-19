import { RootState } from "../types";
import { RESIZE, SET_THREE_CONTAINER } from "../constants";

export const rootReducer = (
  state: RootState,
  action: { type: string; payload: { [id: string]: any } }
): RootState => {
  if (action.type === RESIZE) {
    const { width, height } = action.payload;
    return {
      ...state,
      width,
      height,
    };
  } else if (action.type === SET_THREE_CONTAINER) {
    return {
      ...state,
      threeContainerDiv: action.payload.div,
    };
  }

  return state;
};
