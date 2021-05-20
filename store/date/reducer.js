import { dateActionTypes } from './action'

const dateInitialState = {
    date: new Date()
}

export default function reducer(state = dateInitialState, action) {
    switch(action.type) {
        case dateActionTypes.SET_DATE:
            return {...state, dateInitialState: {
                date: action.payload
            }}
        default:
            return state
        
    }
}