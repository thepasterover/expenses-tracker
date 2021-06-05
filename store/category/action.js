import { axiosInstance } from '../../axios'

export const categoryActionTypes = {
    FETCH_CATEGORY_REQUESTS: 'FETCH_CATEGORY_REQUESTS',
    FETCH_CATEGORY_SUCCESS: 'FETCH_CATEGORY_SUCCESS',
    FETCH_CATEGORY_FAILURE: 'FETCH_CATEGORY_FAILURE',
}

const categoryIcons = [
    {icon: 'business', color: '#ff3378', category: "Rents"},
    {icon: 'school', color: '#68cfff', category: "Academics"},
    {icon: 'restaurant', color: '#69C393', category: "Food"},
    {icon: 'flight_takeoff', color: '#fdb574', category: "Travel"},
    {icon: 'play_circle_filled', color: '#ffe100', category: "Entertainment"},
    {icon: 'local_mall', color: '#e4a5fd', category: "Shopping"},
    {icon: 'medical_services', color: 'red', category: "Medicines"},
    {icon: 'grid_view', color: '#F6C4C4', category: "Others"}
]

export const fetchCategories = () => {
    return async(dispatch) => {
        try{
            dispatch({
                type: categoryActionTypes.FETCH_CATEGORY_REQUESTS
            })
            const res = await axiosInstance.get('/auth/categories')
            let categories = res.data
            
            if (categories.length > 0 ){
                categories = categoryIcons.map((t) => {
                    let category = categories.find(e => e.name === t.category.toLowerCase())
                    if(category) {
                    t._id = category._id
                    }
                    return t
                })
            }
            dispatch({
                type: categoryActionTypes.FETCH_CATEGORY_SUCCESS,
                payload: categories
            })
        } catch(err) {
            dispatch({
                type: categoryActionTypes.FETCH_CATEGORY_FAILURE,
                payload: err.message
            })
        }
    }
}