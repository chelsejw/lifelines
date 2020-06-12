
import React, {useState, useEffect} from 'react';
import {trackMessageInput, sendMessage} from './actions'
import {connect} from 'react-redux'
import { API_ROOT, HEADERS } from '../constants';

const NewMessageForm = (props) => {

  // componentWillReceiveProps = nextProps => {
  //   this.setState({ conversation_id: nextProps.conversation_id });
  // };

    return (
      <div className="newMessageForm">
        <form>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            defaultValue={props.chat.messageInput}
            onChange={(e)=> props.trackMessageInput(e.target.value)}
          />
          <button onClick={(e)=> {
            e.preventDefault();
            console.log(`clicked btn`)
            props.sendMessage(props.auth.currentUser.id, props.chat.activeConversation, props.chat.messageInput)
            }}
            className="btn btn-sm btn-danger">Send</button>
        </form>
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
      trackMessageInput: (input)=>{
        dispatch(trackMessageInput(input));
      },
      sendMessage: (userId, convoId, text) =>{
        dispatch(sendMessage(userId, convoId, text))
      }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm);
// helpers
