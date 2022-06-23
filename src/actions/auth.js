import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { errors } from "../errors";

import { googleAuthProvider } from "../firebase/config";
import { TYPES } from "../types";
import { finishLoading, setError, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    /* setTimeout(() => {
      dispatch(login(123456, "Jorguito"));
    }, 3000); */
    dispatch(startLoading());

    signInWithEmailAndPassword(getAuth(), email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(finishLoading());

        const { code, msg } = errors(err.code);
        dispatch(setError(code, msg));
        /* for (const prop of errors) {
          prop.code === err.code && dispatch(setError(prop.msg));
        } */
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
        });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => console.log(err));
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(getAuth(), googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    signOut(getAuth())
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => console.log(err));
  };
};

export const login = (uid, displayName) => ({
  type: TYPES.LOGIN,
  payload: {
    uid,
    displayName,
  },
});
export const logout = () => ({ type: TYPES.LOGOUT });
