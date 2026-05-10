import { combineReducers } from "@reduxjs/toolkit"

import UserReducer from "./UserReducer"


export default combineReducers({
    UserStateData: UserReducer,
})