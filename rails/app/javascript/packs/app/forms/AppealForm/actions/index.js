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

export function clearForm(){
    return {
        type: 'CLEAR_FORM'
    }
}

export function postAppealForm(payload, userId) {
    return (dispatch) => {
        dispatch(appealPostRequestHasError(false));
      dispatch(appealPostRequestIsLoading(true));
      const token = document.querySelector("[name=csrf-token]").content;
      axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

      let appealData = {
          ...payload,
          user_id: userId,
          status: "open"
      }

      axios
        .post(`/api/v1/appeals`, appealData)
        .then((response) => {
          dispatch(appealPostRequestIsLoading(false));
          console.log(`got response`);
          console.log(response.data)
          dispatch(appealPostRequestSuccess(response.data));
          dispatch(clearForm());
        })
        .catch((err) => {
          console.log(err.response);
          dispatch(appealPostRequestIsLoading(false));
          dispatch(appealPostRequestHasError(true));
        });
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
            console.log(`get edit form`)
            console.log(response.data)
            dispatch(formDataFetchSuccess(response.data.user.id, "user_id"))
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
        isLoading: bool,
    }
}

export function appealPatchRequestHasError(bool, statusCode, statusText){
    return {
        type: 'APPEAL_PATCH_REQUEST_HAS_ERROR',
        hasErrored: bool,
        statusCode,
        statusText
    }
}


export function appealPatchRequestSuccess(data) {
  return {
    type: "APPEAL_PATCH_REQUEST_SUCCESS",
    data
  };
}

export function sendPatchAppealRequest(data, appealId){
    return (dispatch) => {
      dispatch(appealPatchRequestIsLoading(true));
      dispatch(appealPostRequestHasError(false));

      console.log(data);

      const token = document.querySelector("[name=csrf-token]").content;
      axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
      let cleanData = (object)=> {
        delete data["species"];
        delete data["clinic"];
      delete data["user"];
      delete data["id"];
      delete data["created_at"];
      delete data["updated_at"];  
      return data
      }

      axios
        .patch(`${api}appeals/${appealId}`, cleanData(data) )
        .then((response) => {
            console.log(`Got response from patch appeal request`)
            console.log(response.data)
          dispatch(appealPatchRequestIsLoading(false));
          dispatch(appealPatchRequestSuccess(response.data));
        })
        .catch((err) => {
          console.log(err.response);
          dispatch(
            appealPatchRequestHasError(
              true,
              err.response.status,
              err.response.statusText
            )
          );
        });
    };
}