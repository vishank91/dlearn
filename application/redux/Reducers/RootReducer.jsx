import { combineReducers } from "@reduxjs/toolkit"

import UserReducer from "./UserReducer"
import UserAuthReducer from "./UserAuthReducer"
import ClassReducer from "./ClassReducer"


export default combineReducers({
    UserStateData: UserReducer,
    UserAuthData: UserAuthReducer,
    ClassStateData: ClassReducer,
})