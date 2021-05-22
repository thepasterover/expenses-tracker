import axios from 'axios'

export const categoryActionTypes = {
    FETCH_CATEGORY_REQUESTS: 'FETCH_CATEGORY_REQUESTS',
    FETCH_CATEGORY_SUCCESS: 'FETCH_CATEGORY_SUCCESS',
    FETCH_CATEGORY_FAILURE: 'FETCH_CATEGORY_FAILURE',
}

export const fetchCategories = () => {
    return async(dispatch) => {
        try{
            dispatch({
                type: categoryActionTypes.FETCH_CATEGORY_REQUESTS
            })
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            const categories = res.data
            console.log(categories)
            dispatch({
                type: categoryActionTypes.FETCH_CATEGORY_SUCCESS,
                payload: categories
            })
        } catch(err) {
            console.log(err)
            dispatch({
                type: categoryActionTypes.FETCH_CATEGORY_FAILURE,
                payload: err.message
            })
        }
    }
}