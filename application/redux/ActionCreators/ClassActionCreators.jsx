import { CREATE_CLASS, DELETE_CLASS, GET_CLASS, UPDATE_CLASS } from "../Constant"


export function createClass(data) {
    return {
        type: CREATE_CLASS,
        payload: data
    }
}

export function getClass() {
    return {
        type: GET_CLASS
    }
}

export function updateClass(data) {
    return {
        type: UPDATE_CLASS,
        payload: data
    }
}

export function deleteClass(data) {
    return {
        type: DELETE_CLASS,
        payload: data
    }
}
