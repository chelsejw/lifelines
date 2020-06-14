const authReducer = (state = {
    currentUser: {
        profile: {
            address: ""
        }
    },
    isLoggedIn: false,
    checkAuthError: false,
    activeConvo: "" 
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
        case "SET_ACTIVE_CONVERSATION":
            return {
              ...state,
              activeConvo: action.conversationId,
            };
        default:
            return state;
    }
}

export default authReducer
 