import { TYPES } from "../types";

const initialState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action?.type) {
    case TYPES.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case TYPES.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };
    case TYPES.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case TYPES.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
