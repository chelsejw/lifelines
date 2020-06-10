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
                dispatch(appealsHasError(true))}
            );
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
                dispatch(focusedAppealHasError(true))}
            );
    };
}