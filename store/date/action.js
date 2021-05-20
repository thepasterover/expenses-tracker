export const dateActionTypes = {
    SET_DATE: 'SET_DATE'
}

export const setDate = (selectedDate) => (dispatch) => {
    return dispatch({ 
        type: dateActionTypes.SET_DATE,
        payload: selectedDate 
    })
}