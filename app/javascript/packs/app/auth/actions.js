import axios from 'axios'

export const api = '/api/v1'


export function setIsLoggedIn(bool) {
    return {
        type: 'SET_IS_LOGGED_IN',
        isLoggedIn: bool
    };
}
export function setCurrentUser(data) {
    return {
        type: 'SET_CURRENT_USER',
        data
    };
}

export function checkAuthError(bool) {
    return {
        type: 'CHECK_AUTH_HAS_ERROR',
        checkAuthError: bool
    };
}

export function setActiveConversation(conversationId){
    return {
      type: "SET_ACTIVE_CONVERSATION",
      conversationId,
    };
}

export function checkAuth() {
    return (dispatch)=>{
        axios
        .get(`${api}/auth/check-login`)
        .then(res=>{
            if (res.data.isLoggedIn==false){
                return dispatch(setIsLoggedIn(false));
            }
            dispatch(setIsLoggedIn(true));
            dispatch(setCurrentUser(res.data))
        })
        .catch(err => {
            dispatch(checkAuthError(true));
            console.log(err.response)
        })


    }
}