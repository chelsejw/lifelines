const appealsFormReducer = (state = {
    data: [{
        species_id: "",
        pet_name: "",
        clinic_id: "",
        description: "",
        img_url: ""
        }
    ],
    isLoading: false,
    hasErrored: false,
    inputData: {},
    formData: {
        clinics: [],
        species: []
    },
    isEditing: false,
    edit: {
        editInput: {
            species_id: "",
            pet_name: "",
            clinic_id: "",
            description: "",
            img_url: ""
            },
        isLoading: false,
        hasErrored: false,
        errorDetails: {
            statusCode: "",
            statusText: ""
        }
    },
    patch: {
        data: {},
        isLoading: false,
        hasErrored: false,
        errorDetails: {
            statusCode: "",
            statusText: "",
        }
    }
}, action) => {
    switch (action.type) {
        case 'APPEAL_POST_REQUEST_DATA_SUCCESS':
            return {
                ...state,
                data: action.data};
        case 'APPEAL_POST_REQUEST_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading};
        case 'TRACK_INPUT_DATA':
            return {
                ...state,
                inputData: {
                    ...state.inputData,
                    [action.field]: action.input
                }
            }
        case 'APPEAL_POST_REQUEST_HAS_ERROR':
            return {
                ...state,
                hasErrored: action.hasErrored
            };
        case 'GET_FORM_FIELD_DATA':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.data
                }
            }
        case 'GET_EDIT_FORM_DATA_SUCCESS':
            return {
                ...state,
                edit: {
                    ...state.edit,
                    editInput: action.data
                }
            }
        case 'GET_EDIT_FORM_DATA_HAS_ERROR':
            return {
                ...state,
                edit: {
                    ...state.edit,
                    hasErrored: action.hasErrored,
                    errorDetails: {
                        statusCode: action.statusCode,
                        statusText: action.statusText
                    }
                }
            }
        case 'GET_EDIT_FORM_DATA_IS_LOADING':
            return {
                ...state,
                edit: {
                    ...state.edit,
                    isLoading: action.isLoading
                }
            }
        case 'TRACK_EDIT_FORM_INPUT':
            return {
                ...state,
                edit: {
                    ...state.edit,
                    inputData: {
                        ...state.edit.inputData,
                        [action.field]: action.input
                    }
                }
            }
        case 'APPEAL_PATCH_REQUEST_IS_LOADING':
            return {
                ...state,
                patch: {
                    ...state.patch,
                    isLoading: action.isLoading
                }
            }
            case 'APPEAL_PATCH_REQUEST_HAS_ERROR':
                return {
                    ...state,
                    patch: {
                        ...state.patch,
                        hasErrored: action.hasErrored,
                        errorDetails: {
                            statusCode: action.statusCode,
                            statusText: action.statusText
                        }
                    }
                }
            case 'APPEAL_PATCH_REQUEST_SUCCESS':
                return {
                    ...state,
                    patch: {
                        ...state.patch,
                        data: action.data
                    }
                }
        default:
            return state;
    }
}

export default appealsFormReducer
 