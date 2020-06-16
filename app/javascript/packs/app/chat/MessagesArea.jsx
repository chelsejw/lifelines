import React from "react";
import NewMessageForm from "./NewMessageForm";

const MessagesArea = (props) => {

  return (
    <div className="messagesArea">
      <h2>Conversation {props.conversation.id}</h2>

      <NewMessageForm conversation_id={props.conversation.id}/>

      <ul>{orderedMessages(props.conversation.messages)}</ul>
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = (messages) => {
  const sortedMessages = messages.sort((a, b) =>
    new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
  );
  return sortedMessages.map((message) => {
    return <li key={message.id}>{message.user.email} says: {message.text}</li>;
  });
};
