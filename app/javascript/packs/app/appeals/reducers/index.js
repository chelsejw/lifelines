const appealsReducer = (state = {
    data: [],
    isLoading: false,
    hasErrored: false,
    focusedData: null,
    focusedIsLoading: false,
    focusedHasErrored: false,
    focusedLifeline: {
        isUserConnected: false
    },
    throwLifeline: {
        data: {},
        success: false
    }
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
        case 'LIFELINES_FETCH_DATA_SUCCESS':
            return {
                ...state,
                focusedLifeline: action.data};
        case 'THROW_LIFELINE_SUCCESS':
            return {
                ...state,
                throwLifeline: {
                    data: action.data,
                    success: true
                }
            }
        default:
            return state;
    }
}

export default appealsReducer
 