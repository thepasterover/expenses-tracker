import { navActionTypes } from './action'

const navInititalState = {
    title: undefined,
    index: undefined
}

const reducer = (state = navInititalState, action) => {
    switch(action.type){
        case navActionTypes.SET_TITLE:
            return { ...state, title: action.payload.title, index: action.payload.index }
        default:
            return state
    }
}

export default reducer