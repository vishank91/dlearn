import { USER_LOGIN_RED, USER_LOGOUT_RED } from "../Constant"

const initialState = {
     isLogin: false,
     role: "",
     user: null
}
export default function UserAuthReducer(state = initialState, action) {
     switch (action.type) {
          case USER_LOGIN_RED:
               return {
                    isLogin: true,
                    role: action.payload.role,
                    user: action.payload
               }
          case USER_LOGOUT_RED:
               return { ...initialState }
          default:
               return state
     }
}   