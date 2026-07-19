import { CREATE_EVENT, DELETE_EVENT, GET_EVENT, UPDATE_EVENT } from "../Constant"


export function createEvent(data) {
    return {
        type: CREATE_EVENT,
        payload: data
    }
}

export function getEvent() {
    return {
        type: GET_EVENT
    }
}

export function updateEvent(data) {
    return {
        type: UPDATE_EVENT,
        payload: data
    }
}

export function deleteEvent(data) {
    return {
        type: DELETE_EVENT,
        payload: data
    }
}
