import axios from "axios";
import { put, takeEvery, delay } from "redux-saga/effects";
import { REGISTER, LOGIN, LOGOUT } from "../actions";

const BASE_URL = "http://localhost:3001/v1";

const doRegister = (action) =>
  axios.post(
    `${BASE_URL}/register`,
    { ...action.payload },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
const doLogin = (action) =>
  axios.post(
    `${BASE_URL}/login`,
    { ...action.payload },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
const doFetchUser = (token) =>
  axios.get(`${BASE_URL}/users`, {
    headers: { "Content-Type": "application/json", Authorization: token },
  });

function* register(action) {
  yield put({ type: "LOADING" });
  try {
    const { data } = yield doRegister(action);
    yield delay(1000);
    const { token, user } = data.result;
    yield put({ type: "LOGIN", payload: { token, user } });
    yield put({
      type: "SHOW_TOASTER",
      payload: { success: true, message: "Registered in succesfully !" },
    });
    const response = yield doFetchUser(token);
    const users = response.data.result;
    yield put({ type: "FETCH_USERS", payload: { users } });
  } catch (err) {
    yield put({
      type: "SHOW_TOASTER",
      payload: { success: false, message: err.message },
    });
    yield put({ type: "LOGOUT" });
  }
  yield put({ type: "LOADED" });
  yield delay(3000);
  yield put({ type: "REMOVE_TOASTER" });
  yield delay(60000);
  yield put({ type: "LOGOUT" });
  yield put({
    type: "SHOW_TOASTER",
    payload: { success: true, message: "Loged out succesfully !" },
  });
}
function* login(action) {
  yield put({ type: "LOADING" });
  try {
    const { data } = yield doLogin(action);
    yield delay(1000);
    const { token, user } = data.result;
    yield put({ type: "LOGIN", payload: { token, user } });
    yield put({
      type: "SHOW_TOASTER",
      payload: { success: true, message: "Logged in succesfully !" },
    });
    const response = yield doFetchUser(token);
    const users = response.data.result;
    yield put({ type: "FETCH_USERS", payload: { users } });
  } catch (err) {
    yield put({
      type: "SHOW_TOASTER",
      payload: { success: false, message: err.response.data.message },
    });
    yield put({ type: "LOGOUT" });
  }
  yield put({ type: "LOADED" });
  yield delay(3000);
  yield put({ type: "REMOVE_TOASTER" });
  yield delay(60000);
  yield put({ type: "LOGOUT" });
  yield put({
    type: "SHOW_TOASTER",
    payload: { success: true, message: "Loged out succesfully !" },
  });
}

function* logout() {
  yield put({ type: "LOADING" });
  yield delay(1000);
  yield put({ type: "LOGOUT" });
  yield put({
    type: "SHOW_TOASTER",
    payload: { success: true, message: "Loged out  succesfully !" },
  });
  yield put({ type: "LOADED" });
  yield delay(3000);
  yield put({ type: "REMOVE_TOASTER" });
}

export default function* authSaga() {
  yield takeEvery(REGISTER, register);
  yield takeEvery(LOGIN, login);
  yield takeEvery(LOGOUT, logout);
}
