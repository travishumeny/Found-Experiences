import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import persistState from "redux-localstorage";

import app from "../reducers";
import saga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(logger),
  persistState()
);

let store = createStore(app, enhancer);
sagaMiddleware.run(saga);

export default store;
