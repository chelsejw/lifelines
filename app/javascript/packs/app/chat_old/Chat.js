import React from 'react'
import {ActionCableProvider} from 'react-actioncable-provider';
import ConversationsList from './ConversationsList'

const Chat = (props) => {

    return (
        <ActionCableProvider url={"ws://localhost:3000/cable"}>

        <div>
            <ConversationsList/>

        </div>
    </ActionCableProvider>

    )

}

export default Chat