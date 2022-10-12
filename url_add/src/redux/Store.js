import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import indexReducer from "./rootReducer";
import mySaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  indexReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mySaga);

export default store;
