export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case "LOGIN_USER":
            return({...state, name:payload.name, email:payload.email, id:payload.id });
        case "LOGOUT_USER":
            return(payload);
    
        default:
            return({...state});
    }    
}