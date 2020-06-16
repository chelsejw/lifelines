import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT } from "./constants";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
           var elem = document.querySelector(".messages");
           console.log(elem);
           elem.scrollTop = elem.scrollHeight;
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

  const findActiveConversation = (conversations, activeConversation) => {
    return conversations.find(
      (conversation) => conversation.id === activeConversation
    );
  };

  const mapConversations = (conversations, handleClick) => {
    return conversations.map((conversation, index) => {
      let recipient = conversation.users.find(
        (user) => user.id !== this.props.auth.currentUser.user.id
      );

      return (
        <div
          key={index}
          className="w-100 convo-item"
          onClick={() => handleClick(conversation.id)}
        >
          <div className="row px-3 py-4">
            <div className="convo-item-pic mx-2">
              <img
                src={
                  conversation.lifeline.appeal.img_url !== "" &&
                  conversation.lifeline.appeal.img_url
                    ? conversation.lifeline.appeal.img_url
                    : "https://res.cloudinary.com/dwbuqa4dx/image/upload/v1592316118/logo1_bf4f9f.png"
                }
                className="img-fluid"
              />
            </div>
            <div className="convo-item-body">
              {" "}
              With{" "}
              <span className="font-weight-bold">
                {recipient.profile.display_name}
              </span>
              <br />
              For{" "}
              <Link
                className="text-danger"
                to={`/appeals/${conversation.lifeline.appeal.id}`}
              >
                {conversation.lifeline.appeal.pet_name}'s appeal
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList row">
        <div className="chat-left col-md-5 col-6 p-0">
          <h3 className="p-4">Conversations</h3>

          <div className="px-0">
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
            {mapConversations(conversations, this.handleClick)}
          </div>
        </div>

        <div className="col-md-7 col-6 p-0">
          {activeConversation ? (
            <MessagesArea
            currentUser={this.props.currentUser}
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
            />
          ) : null}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentUser: state.auth.currentUser
  };
};
export default connect(mapStateToProps)(ConversationsList);
// helpers
