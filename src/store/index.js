import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";

import reducer from "../reducers";

import thunk from "redux-thunk"; //middleware para hacer pedidos asincrónicos

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; //para poder utilizar varios middlewares en el store

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = configureStore({
  reducer,
  enhancer,
});

export default store;
