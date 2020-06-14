import axios from 'axios'

export function appealsHasError(bool) {
    return {
        type: 'APPEALS_HAS_ERROR',
        hasErrored: bool
    };
}
export function appealsIsLoading(bool) {
    return {
        type: 'APPEALS_IS_LOADING',
        isLoading: bool
    };
}
export function appealsFetchDataSuccess(data) {
    return {
        type: 'APPEALS_FETCH_DATA_SUCCESS',
        data
    };
}
export function fetchAllAppeals(url) {
    return (dispatch) => {
        dispatch(appealsIsLoading(true));
        console.log(`in appealsFetchData`)
        axios.get(url)
            .then((response) => {
                dispatch(appealsIsLoading(false));
                console.log(`got response`)
                dispatch(appealsFetchDataSuccess(response.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(appealsHasError(true))
            });
    };
}

export function focusedAppealHasError(bool) {
    return {
        type: 'FOCUSED_APPEAL_HAS_ERROR',
        hasErrored: bool
    };
}
export function focusedAppealIsLoading(bool) {
    return {
        type: 'FOCUSED_APPEAL_IS_LOADINF',
        isLoading: bool
    };
}
export function focusedAppealFetchDataSuccess(data) {
    return {
        type: 'FOCUSED_APPEAL_FETCH_DATA_SUCCESS',
        data
    };
}

export function fetchOneAppeal(appealId) {
    return (dispatch) => {
        dispatch(focusedAppealIsLoading(true));
        console.log(`in fetchOneAppeal`)
        axios.get(`/api/v1/appeals/${appealId}`)
            .then((response) => {
                dispatch(focusedAppealIsLoading(false));
                console.log(`got response`)
                console.log(response.data)
                dispatch(focusedAppealFetchDataSuccess(response.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(focusedAppealHasError(true))
            });
    };
}

export function lifelinesFetchDataSuccess(data) {
    return {
        type: 'LIFELINES_FETCH_DATA_SUCCESS',
        data
    };
}

export function fetchLifelineData(appealId) {
    return (dispatch) => {
        console.log(`in fetch lifelines`)
        axios.get(`/api/v1/appeals/${appealId}/get-lifelines`)
            .then((response) => {

                dispatch(lifelinesFetchDataSuccess(response.data))
            })
            .catch((err) => {
                console.log(`Alamak got error`)
                console.log(err)
            });
    }
};

export function throwLifelineSuccess(data){
    return {
        type: 'THROW_LIFELINE_SUCCESS',
        data
    }
}


export function throwLifeline(user, appealOwner, appealId){
    return (dispatch)=>{
        const token = document.querySelector("[name=csrf-token]").content;
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token;  
        axios
        .post(`/api/v1/appeals/${appealId}/throw-lifeline`)
        .then(res => {
            console.log(`response received`);
            dispatch(throwLifelineSuccess(res.data))
            return res.data
        })
        .then((res)=>{
            console.log(`in axios convo part of lifeline`)
            console.log(`res data after lifeline`, res)
            axios.
            post(`/conversations`, {
                conversation: {
                  lifeline_id: res.id,
                  user_ids: [user.id, appealOwner.id]
                }
            })
            .then((res)=>{
              console.log(`was there a response from post to convos`)
              console.log(`res,`, res)
            })  
            .catch(err => {
              console.log(`error in post request`)
              console.log(err.response)
            })
          })
        .catch(err=>console.log(err))
    }
}