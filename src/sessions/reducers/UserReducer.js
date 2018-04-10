export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case "LOGIN_USER":
            return( {...state, name:payload.name, id:payload.id });
    
        default:
            return({...state});
    }    
}