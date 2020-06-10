const appealsReducer = (state = {
    data: [],
    isLoading: false,
    hasErrored: false
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
        default:
            return state;
    }
}

export default appealsReducer
 