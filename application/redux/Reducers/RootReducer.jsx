import { combineReducers } from "@reduxjs/toolkit"

import UserReducer from "./UserReducer"
import UserAuthReducer from "./UserAuthReducer"


export default combineReducers({
    UserStateData: UserReducer,
    UserAuthData: UserAuthReducer,
})