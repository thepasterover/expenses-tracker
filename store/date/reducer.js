import { dateActionTypes } from './action'

import moment from 'moment'

const dateInitialState = {
    date: moment().format('MMM YYYY')
}

export default function reducer(state = dateInitialState, action) {
    switch(action.type) {
        case dateActionTypes.SET_DATE:
            return Object.assign({}, state, {
                date: moment(action.payload).format('MMM YYYY')
            })
        default:
            return state
        
    }
}