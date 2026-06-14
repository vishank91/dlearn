import { all } from "redux-saga/effects";

import UserSagas from "./UserSagas"

export default function* RootSaga() {
    yield all([
        UserSagas(),
    ])
}