export const loginUser = (data) => {
    return({
        type: "LOGIN_USER",
        payload: {
            name: (data.name)?(data.name):"",
            email: (data.email)?(data.email):"",
            id: (data.id)?(data.id):""
        }
    })
}
export const logoutUser = (data) => {
    return(function(dispatch) {
        dispatch({
            type: "LOGOUT_USER",
            payload: {}
        });
    })
}