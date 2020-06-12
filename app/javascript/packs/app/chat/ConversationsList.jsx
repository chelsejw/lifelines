
import React, {useEffect} from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import {connect} from 'react-redux'

import {getUserConversations, setConversations, setActiveConversation} from './actions'

const ConversationsList = (props) => {
  //First render.
  useEffect(()=> {
    props.getUserConversations();
  }, [])
  const handleClick = id => {
    props.setActiveConversation(id)
  };

  const handleReceivedConversation = response => {
    console.log(`triggered handle received convo`, response)
    const { conversation } = response;
    setConversations([...props.chat.conversations, conversation])
  };

  const handleReceivedMessage = response => {
    console.log(`triggered handle received mesage`, response)
    const { message } = response;
    const convos = [...props.chat.conversations];
    const convo = convos.find(
      convo => convo.id === message.conversation_id
    );
    convo.messages = [...convo.messages, message];
    setConversations(convos)
  };

  const otherUser = (convo, currentUserId) => {
    let user = convo.users.find(user => user.id!==currentUserId)
    return user ? user.email : "yourself"
  }


  const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
  };

  const convoList = props.chat.conversations.map((convo, index)=>{
    return (
      <li key={index} onClick={()=> handleClick(convo.id)}>
        CONVERSATION {convo.id} with {otherUser(convo, props.auth.currentUser.id)}
      </li>
    )})

    return (
      <div className="conversationsList">
        <ActionCableConsumer
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={handleReceivedConversation}
        />
        {props.chat.conversations.length ? (
          <Cable
            conversations={props.chat.conversations}
            handleReceivedMessage={handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{convoList}</ul>
        {props.chat.activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              props.chat.conversations,
              props.chat.activeConversation
            )}
          />
        ) : null}
      </div>
    );
};



const mapStateToProps = (state) => {
  return {
      chat: state.chat,
      auth: state.auth
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      getUserConversations: () => {
        dispatch(getUserConversations());
      },
      setConversations: (convoId) => {
        dispatch(setConversations(convoId))
      },
      setActiveConversation: (convoId) => {
        dispatch(setActiveConversation(convoId))
      }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);
// helpers
