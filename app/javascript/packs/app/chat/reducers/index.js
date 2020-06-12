
const chatReducer = (state = {
    conversations: [],
    activeConversation: "",
    messageInput: ""
}, action) => {
    switch (action.type) {

        case 'SET_ACTIVE_CONVERSATION':
            return {
                ...state,
                activeConversation: action.convoId
            }
        case 'SET_CONVERSATIONS':
            return {
                ...state,
                conversations: action.conversations
            }
        case 'TRACK_MESSAGE_INPUT':
            return {
                ...state,
                messageInput: action.input
            }
        default:
            return state
            
    }
}

export default chatReducer