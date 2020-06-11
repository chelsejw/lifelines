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
        defaultSelect: {
            isLoaded: false,
            clinic: {
                id: "",
                name: ""
            },
            species: {
                id: "",
                name: ""
            }
        },
        editInput: {
            species_id: "",
            pet_name: "",
            clinic_id: "",
            description: "",
            img_url: "",
            species: {
                id: "",
                name: ""
            },
            clinic: {
                id: "",
                name: ""
            },
            user: {
                id: ""
            }
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
        submitted: false,
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
            console.log(`triggered normal track inpuit`)
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
            let inputKey = 'species'
            if (action.field=='clinics'){
                inputKey = 'clinic'
            } 

            return {
              ...state,
              inputData: {
                ...state.inputData,
                [`${inputKey}_id`]: parseInt(action.data[0].id),
              },
              formData: {
                ...state.formData,
                [action.field]: action.data,
              },
            };
        case 'GET_EDIT_FORM_DATA_SUCCESS':
            return {
                ...state,
                edit: {
                    ...state.edit,
                    editInput: {
                        ...action.data,
                        species_id: action.data.species.id,
                        clinic_id: action.data.clinic.id
                    },
                    defaultSelect: {
                        isLoaded: true,
                        clinic: {
                            id: action.data.clinic.id,
                            name: action.data.clinic.name
                        },
                        species: {
                            id: action.data.species.id,
                            name: action.data.species.name
                    }
                }
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
            console.log(`triggered edit track inpuit`)

            return {
              ...state,
              edit: {
                ...state.edit,
                editInput: {
                  ...state.edit.editInput,
                  [action.field]: action.input,
                },
              },
            };
        case 'APPEAL_PATCH_REQUEST_IS_LOADING':
            return {
                ...state,
                patch: {
                    ...state.patch,
                    isLoading: action.isLoading,
                    submitted: false
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
                        data: action.data,
                        submitted: true
                    }
                }
        default:
            return state;
    }
}

export default appealsFormReducer
 