import React, {useState, useEffect} from 'react'
import {API_WS_ROOT} from '../constants'
import {ActionCableConsumer, ActionCableProvider} from 'react-actioncable-provider'
import ConversationsList from './ConversationsList'

const Chat = (props) => {

    return (
        <ActionCableProvider url={API_WS_ROOT}>

        <div>
            <ConversationsList/>

        </div>
    </ActionCableProvider>

    )

}

export default Chat