import React from "react";
import NewMessageForm from "./NewMessageForm";

const MessagesArea = (props) => {

  return (
    <div className="messagesArea">
      {orderedMessages(props.conversation.messages)}

      <NewMessageForm conversation_id={props.conversation.id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = (messages) => {
  const sortedMessages = messages.sort((a, b) =>
    new Date(a.created_at) > new Date(b.created_at) ? 1 : -1
  );
  return sortedMessages.map((message) => {
    console.log(message)
    return (
      <div key={message.id}>
        <div>{message.id}</div>
        <div className="">{message.text}</div>
      </div>
    );
  });
};
