import { combineReducers } from "@reduxjs/toolkit"

import UserReducer from "./UserReducer"
import UserAuthReducer from "./UserAuthReducer"
import ClassReducer from "./ClassReducer"
import EventReducer from "./EventReducer"


export default combineReducers({
    UserStateData: UserReducer,
    UserAuthData: UserAuthReducer,
    ClassStateData: ClassReducer,
    EventStateData: EventReducer,
})