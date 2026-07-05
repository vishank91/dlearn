import { all } from "redux-saga/effects";

import UserSagas from "./UserSagas"
import ClassSagas from "./ClassSagas"

export default function* RootSaga() {
    yield all([
        UserSagas(),
        ClassSagas(),
    ])
}