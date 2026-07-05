import { CREATE_CLASS_RED, DELETE_CLASS_RED, GET_CLASS_RED, UPDATE_CLASS_RED } from "../Constant"

export default function ClassReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_CLASS_RED:
            return [...state, action.payload]

        case GET_CLASS_RED:
            return action.payload

        case UPDATE_CLASS_RED:
            index = state.findIndex(x => x.id === id)
            state[index] = { ...action.payload }
            return state

        case DELETE_CLASS_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}   