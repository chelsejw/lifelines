import React from "react";
import { ActionCableProvider } from "react-actioncable-provider";
import { API_WS_ROOT } from "./constants";
import ConversationsList from './ConversationsList'
class Chat extends React.Component {
    render(){
        return (
          <ActionCableProvider url={`ws://localhost:3000/cable`}>
            <ConversationsList />
          </ActionCableProvider>
        );
    }
}
export default Chat