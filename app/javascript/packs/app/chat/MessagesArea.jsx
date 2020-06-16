import React, { useEffect } from "react";
import NewMessageForm from "./NewMessageForm";
import moment from 'moment'
import Fade from 'react-reveal/Fade'
const MessagesArea = (props) => {

  useEffect(()=> {
    var elem = document.querySelector('.messages');
    elem.scrollTop = elem.scrollHeight;
  }, [])


  const orderedMessages = (messages) => {
    const sortedMessages = messages.sort((a, b) =>
      new Date(a.created_at) > new Date(b.created_at) ? 1 : -1
    );
    return sortedMessages.map((message) => {
      if (message.user.id == props.currentUser.user.id) {
        return (
          <Fade>
            <div className="sent-message text-right my-4" key={message.id}>
              <div className="font-sm">You</div>
              <span className="bg-danger text-light my-2 text-bod">
                {message.text}
              </span>
              <div className="font-sm">
                {moment(message.created_at).fromNow()}
              </div>
            </div>
          </Fade>
        );
      }
      console.log(message);
      return (
        <Fade>
          <div className="received-message text-left my-4" key={message.id}>
            <div className="font-sm">{message.profile.display_name}</div>
            <span className="bg-light text-dark my-2 text-bod">
              {message.text}
            </span>
            <div className="font-sm">
              {moment(message.created_at).fromNow()}
            </div>
          </div>
        </Fade>
      );
    });
  };

  return (
    <div className="messagesArea">
      <div className="messages p-4">{orderedMessages(props.conversation.messages)}</div>

      <NewMessageForm conversation_id={props.conversation.id} />
    </div>
  );
};

export default MessagesArea;

// helpers

