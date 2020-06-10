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
            console.log(state.inputData)
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
            console.log(`in reducer`)
            console.log(`action.field is`, action.field)
            console.log(`action.data is`, action.data)
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.data
                }
            }
        default:
            return state;
    }
}

export default appealsFormReducer
 