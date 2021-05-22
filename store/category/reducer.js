import { categoryActionTypes } from './action'

const categoryInitialState = {
    loading: false,
    categories: [],
    error: null
}

const reducer = (state = categoryInitialState, action) => {
    switch(action.type){
        case categoryActionTypes.FETCH_CATEGORY_REQUESTS:
            return { ...state, loading: true }
        case categoryActionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
                error: null
            }
        case categoryActionTypes.FETCH_CATEGORY_FAILURE:
            return {
                loading: false,
                categories: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer