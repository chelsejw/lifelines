const appealsReducer = (state = {
    data: [],
    isLoading: false,
    hasErrored: false,
    focusedData: null,
    focusedIsLoading: false,
    focusedHasErrored: false
}, action) => {
    switch (action.type) {
        case 'APPEALS_FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.data};
        case 'APPEALS_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading};
        case 'APPEALS_HAS_ERROR':
            return {
                ...state,
                hasErrored: action.hasErrored};
        case 'FOCUSED_APPEAL_FETCH_DATA_SUCCESS':
            return {
                ...state,
                focusedData: action.data
            }
        case 'FOCUSED_APPEAL_IS_LOADING':
            return {
                ...state,
                focusedIsLoading: action.isLoading};
        case 'FOCUSED_APPEAL_HAS_ERROR':
            return {
                ...state,
                focusedHasErrored: action.hasErrored};
        default:
            return state;
    }
}

export default appealsReducer
 