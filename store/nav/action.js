export const navActionTypes = {
    SET_TITLE: 'SET_TITLE'
}

export const setNav = (title, index) => (dispatch) => {
    return dispatch({
        type: navActionTypes.SET_TITLE,
        payload: {title, index}
    })
}