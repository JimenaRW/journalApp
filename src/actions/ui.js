import { TYPES } from "../types";

export const setError = (code, msg) => ({
  type: TYPES.uiSetError,
  payload: { code, msg },
});

export const removeError = (error) => ({
  type: TYPES.uiRemoveError,
});

export const startLoading = (error) => ({
  type: TYPES.uiStartLoading,
});

export const finishLoading = (error) => ({
  type: TYPES.uiFinishLoading,
});
