import axios from 'axios'

export function setActiveConversation(convoId){
    return {
        type: "SET_ACTIVE_CONVERSATION",
        convoId
    }
}

export function setConversations(conversations){
    return {
        type: "SET_CONVERSATIONS",
        conversations
    }
}

export function getUserConversations(){
    return (dispatch) => {
        axios.get(`/conversations/user`)
        .then(res => {
          console.log(`got something`)
          console.log(res.data)
          return dispatch(setConversations(res.data))
        })
        .catch(err => {
          console.log(err.response)
        });
    }
}

export function trackMessageInput(input){
    return {
        type: 'TRACK_MESSAGE_INPUT',
        input
    }
}

export function sendMessage(userId, convoId, input){
    return dispatch => {
        let messageObject = {
            user_id: userId,
            conversation_id: convoId,
            text: input
        }
        console.log(`messageObject`, messageObject)
    
        const token = document.querySelector("[name=csrf-token]").content;
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
        axios.post(`/messages`, messageObject)
        .then(res=>{
            console.log(`Got a response`)
            console.log(res)
            console.log(res.data)
            dispatch(trackMessageInput(""))
        })
        .catch(err=>{
            console.log(`Error sending message`)
            console.log(err)
            console.log(err.response)
        })

    }

}