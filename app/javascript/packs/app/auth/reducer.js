const authReducer = (state = {
    currentUser: {},
    isLoggedIn: false,
    checkAuthError: false
}, action) => {
    switch (action.type) {
        case "SET_IS_LOGGED_IN":
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.data
            }
        case "CHECK_AUTH_HAS_ERROR":
            return {
                ...state,
                checkAuthError: action.checkAuthError
            }
        default:
            return state;
    }
}

export default authReducer
 