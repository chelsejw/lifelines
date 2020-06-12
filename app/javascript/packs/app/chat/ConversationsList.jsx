
import React, {useState, useEffect} from 'react';
import { ActionCable, ActionCableConsumer } from 'react-actioncable-provider';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import axios from 'axios'

const ConversationsList = () => {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)

  const fetchConvos = ()=> {
    axios.get(`/conversations/user`)
    .then(res => {
      console.log(`got something`)
      console.log(res.data)
      return setConversations(res.data)
    })
    .catch(err => {
      console.log(err.response)
    });
  }


  //First render.
  useEffect(()=> {
    console.log(`useeffect`)
    fetchConvos();
  }
    ,[])

  const handleClick = id => {
    setActiveConversation(id)
  };

  const handleReceivedConversation = response => {
    const { conversation } = response;
    setConversations(currentConvos => [...currentConvos, conversation])
  };

  const handleReceivedMessage = response => {
    const { message } = response;
    const convos = [...conversations];
    const convo = convos.find(
      convo => convo.id === message.conversation_id
    );
    convo.messages = [...convo.messages, message];
    setConversations(convos)
  };


  const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
  };

  const convoList = conversations.map(convo=>{
    return (
      <li key={convo.id} onClick={()=> handleClick(convo.id)}>
        CONVERSATION {convo.id} between user {convo.users[0].email} and user {convo.users[1].email}
      </li>
    )})

    return (
      <div className="conversationsList">
        <ActionCableConsumer
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={handleReceivedConversation}
        />
        {conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{convoList}</ul>
        <NewConversationForm />
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    );
  };

export default ConversationsList;

// helpers
