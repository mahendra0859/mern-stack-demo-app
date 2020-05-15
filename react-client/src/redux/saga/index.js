import { fork } from "redux-saga/effects";

import authSaga from "./auth";
// import engagemenetSaga from "./sagas/engagement";
// import campaignFetchSaga from './sagas/campaign';

export default function* rootSaga() {
  yield fork(authSaga);
  // yield fork(engagemenetSaga)
  // yield fork(campaignFetchSaga);
}
