import axios from 'axios'

export const api = '/api/v1/'

export function appealPostRequestHasError(bool) {
    return {
        type: 'APPEAL_POST_REQUEST_HAS_ERROR',
        hasErrored: bool
    };
}
export function appealPostRequestIsLoading(bool) {
    return {
        type: 'APPEAL_POST_REQUEST_IS_LOADING',
        isLoading: bool
    };
}
export function appealPostRequestSuccess(data) {
    return {
        type: 'APPEAL_POST_REQUEST_DATA_SUCCESS',
        data
    };
}

export function trackInputData(input, field) {
    console.log(`Input: `, input)
    console.log(`Field: `, field)
    return {
        type: 'TRACK_INPUT_DATA',
        field,
        input
    }
}
export function getEditFormDataHasError(boolean, statusCode, statusText) {
    return {
        type: 'GET_EDIT_FORM_DATA_HAS_ERROR',
        hasErrored: boolean,
        statusCode,
        statusText
    };
}
export function getEditFormDataIsLoading(boolean) {
    return {
        type: 'GET_EDIT_FORM_DATA_IS_LOADING',
        isLoading: boolean
    };
}

export function formDataFetchSuccess(data, field){
    return {
        type: 'GET_FORM_FIELD_DATA',
        data,
        field
    }
}

export function getFormRenderData(){
    return (dispatch) => {
        axios
        .get(`${api}clinics`)
        .then((response)=>{
            console.log(`got clinic data`)
            dispatch(formDataFetchSuccess(response.data, "clinics"));
        })
        .then(()=>{
            axios
            .get(`${api}species`)
            .then((response)=>{
                console.log(`got species data`)
                dispatch(formDataFetchSuccess(response.data, "species"));
            })
        })
        .catch(error => console.log(error))

        axios.get(`api`)

    }

}

export function postAppealForm(payload) {
    return (dispatch) => {
        dispatch(appealPostRequestIsLoading(true));
        console.log(`in post appeals`)
        console.log(`my payload is`, payload)

        const token = 
        document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token
        
        axios
        .post(`/api/v1/appeals`, payload)
        .then((response) => {
            dispatch(appealPostRequestIsLoading(false));
            console.log(`got response`)
            dispatch(appealPostRequestSuccess(response.data))
        })
        .catch((err) => {
            console.log(err)
            dispatch(appealPostRequestIsLoading(false));
            dispatch(appealPostRequestHasError(true))}
         );
    };
}


export function trackEditFormInput(input, field) {
    console.log(`Input: `, input)
    console.log(`Field: `, field)
    return {
        type: 'TRACK_EDIT_FORM_INPUT',
        field,
        input
    }
}

export function getEditFormDataSuccess(data) {
    return {
        type: "GET_EDIT_FORM_DATA_SUCCESS",
        data
    }
}

export function getEditFormData(appealId){
    return (dispatch) => {
        dispatch(getEditFormDataIsLoading(true))
        axios
        .get(`${api}appeals/${appealId}`)
        .then(response => {
            dispatch(getEditFormDataIsLoading(false))
            dispatch(getEditFormDataSuccess(response.data))
        })
        .catch(err => {
            console.log(err.response)
            dispatch(getEditFormDataHasError(true, err.response.status, err.response.statusText))
        })
    }
}


export function appealPatchRequestIsLoading(bool){
    return {
        type: 'APPEAL_PATCH_REQUEST_IS_LOADING',
        isLoading: bool
    }
}

export function appealPatchRequestHasError(bool, statusCode, statusText){
    return {
        type: 'APPEAL_PATCH_REQUEST_IS_LOADING',
        hasErrored: bool,
        statusCode,
        statusText
    }
}
export function sendPatchAppealRequest(appealId){
    return dispatch => {
        dispatch

    }
}