export const loginUser = (data) => {
    return({
        type: "LOGIN_USER",
        payload: {
            name: (data.name)?(data.name):"krishna",
            id: (data.id)?(data.id):41
        }
    })
}