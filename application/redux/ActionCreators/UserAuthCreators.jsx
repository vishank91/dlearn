import { USER_LOGIN_RED, USER_LOGOUT_RED } from "../Constant"


export function userLogin(data) {
     return {
          type: USER_LOGIN_RED,
          payload: data
     }
}

export function userLogout(data) {
     return {
          type: USER_LOGOUT_RED
     }
}
