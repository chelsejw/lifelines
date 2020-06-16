import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT } from "./constants";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then((res) => res.json())
      .then((conversations) => this.setState({ conversations }));
  };

  handleClick = (id) => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation],
    });
  };

  handleReceivedMessage = (response) => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );

    let duplicateMessages = conversation.messages.filter(
      (msg) => msg.id == message.id
    );

    if (duplicateMessages.length !== 0) {
      return;
    } else {
      conversation.messages = [...conversation.messages, message];
      this.setState({ conversations });
    }
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCableConsumer
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
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
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    (conversation) => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map((conversation, index) => {
    return (
      <li key={index} onClick={() => handleClick(conversation.id)}>
       Conversation {conversation.id}
      </li>
    );
  });
};
