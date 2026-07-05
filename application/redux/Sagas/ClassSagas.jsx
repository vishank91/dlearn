import { put, takeEvery } from "redux-saga/effects"

import { CREATE_CLASS, CREATE_CLASS_RED, DELETE_CLASS, DELETE_CLASS_RED, GET_CLASS, GET_CLASS_RED, UPDATE_CLASS } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./service/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./service/index"

function* createSaga(action) {
    let response = yield createRecord("class", action.payload)
    // let response = yield createMultipartRecord("class", action.payload)
    yield put({ type: CREATE_CLASS_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("class")
    yield put({ type: GET_CLASS_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("class", action.payload)
    yield put({ type: CREATE_CLASS_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("class", action.payload)
    // yield put({ type: CREATE_CLASS_RED, payload: response })
}

function* deleteSaga(action) {
    yield deleteRecord("class", action.payload)
    yield put({ type: DELETE_CLASS_RED, payload: action.payload })
}


export default function* ClassSagas() {
    yield takeEvery(CREATE_CLASS, createSaga)
    yield takeEvery(GET_CLASS, getSaga)
    yield takeEvery(UPDATE_CLASS, updateSaga)
    yield takeEvery(DELETE_CLASS, deleteSaga)
}