import { configureStore } from "@reduxjs/toolkit"
import CreateSagaMiddleware from "redux-saga"

import RootSaga from "./Sagas/RootSaga"
import RootReducer from "./Reducers/RootReducer"

const Saga = CreateSagaMiddleware()


const Store = configureStore({
    reducer: RootReducer,
    middleware: () => [Saga]
})

export default Store

Saga.run(RootSaga)
