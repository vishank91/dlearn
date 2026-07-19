import { put, takeEvery } from "redux-saga/effects"

import { CREATE_EVENT, CREATE_EVENT_RED, DELETE_EVENT, DELETE_EVENT_RED, GET_EVENT, GET_EVENT_RED, UPDATE_EVENT } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./service/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./service/index"

function* createSaga(action) {
    let response = yield createRecord("event", action.payload)
    // let response = yield createMultipartRecord("event", action.payload)
    yield put({ type: CREATE_EVENT_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("event")
    yield put({ type: GET_EVENT_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("event", action.payload)
    yield put({ type: CREATE_EVENT_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("event", action.payload)
    // yield put({ type: CREATE_EVENT_RED, payload: response })
}

function* deleteSaga(action) {
    yield deleteRecord("event", action.payload)
    yield put({ type: DELETE_EVENT_RED, payload: action.payload })
}


export default function* EventSagas() {
    yield takeEvery(CREATE_EVENT, createSaga)
    yield takeEvery(GET_EVENT, getSaga)
    yield takeEvery(UPDATE_EVENT, updateSaga)
    yield takeEvery(DELETE_EVENT, deleteSaga)
}