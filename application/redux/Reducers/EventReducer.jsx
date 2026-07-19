import { CREATE_EVENT_RED, DELETE_EVENT_RED, GET_EVENT_RED, UPDATE_EVENT_RED } from "../Constant"

export default function EventReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_EVENT_RED:
            return [...state, action.payload]

        case GET_EVENT_RED:
            return action.payload

        case UPDATE_EVENT_RED:
            index = state.findIndex(x => x.id === id)
            state[index] = { ...action.payload }
            return state

        case DELETE_EVENT_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}   