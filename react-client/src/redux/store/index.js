import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import createSagaMiddleWare from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "../reducer";
import rootSaga from "../saga";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleWare = createSagaMiddleWare();

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleWare, logger)
);
export const persistor = persistStore(store);
sagaMiddleWare.run(rootSaga);
