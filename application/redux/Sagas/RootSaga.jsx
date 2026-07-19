import { all } from "redux-saga/effects";

import UserSagas from "./UserSagas"
import ClassSagas from "./ClassSagas"
import EventSagas from "./EventSagas"

export default function* RootSaga() {
    yield all([
        UserSagas(),
        ClassSagas(),
        EventSagas(),
    ])
}