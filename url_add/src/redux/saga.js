import { takeLatest, put, call } from "redux-saga/effects";
import { receivecategories } from "./Action";
import {
  fetchCategory,
  addCategory,
  deleteCategory,
  updateCategory,
  addUrl,
  deleteUrl,
  updateUrl,
  addUser,
} from "./Api";

function* getOrderData() {
  try {
    const data = yield call(fetchCategory);
    yield put(receivecategories(data));
  } catch (err) {
    console.log(err);
  }
}

function* addcategory(action) {
  try {
    yield call(addCategory, action.data);
  } catch (err) {
    console.log(err);
  }
}

function* deletecategory(action) {
  try {
    yield call(deleteCategory, action.id);
  } catch (err) {
    console.log(err);
  }
}

function* updatecategory(action) {
  try {
    yield call(updateCategory, action.name, action.id);
  } catch (err) {
    console.log(err);
  }
}

function* addurl(action) {
  try {
    yield call(addUrl, action.name, action.id);
  } catch (err) {
    console.log(err);
  }
}

function* deleteurl(action) {
  try {
    yield call(deleteUrl, action.id);
  } catch (err) {
    console.log(err);
  }
}

function* updateurl(action) {
  try {
    yield call(updateUrl, action.name, action.id);
  } catch (err) {
    console.log(err);
  }
}

function* adduser(action) {
  try {
    yield call(addUser, action.data);
  } catch (err) {
    console.log(err);
  }
}
export default function* mySaga() {
  yield takeLatest("GET_CATEGORIES", getOrderData);
  yield takeLatest("ADD_CATEGORY", addcategory);
  yield takeLatest("DELETE_CATEGORY", deletecategory);
  yield takeLatest("UPDATE_CATEGORY", updatecategory);
  yield takeLatest("ADD_URL", addurl);
  yield takeLatest("DELETE_URL", deleteurl);
  yield takeLatest("UPDATE_URL", updateurl);
  yield takeLatest("ADD_USER", adduser);
}
