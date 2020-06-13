// src/components/Cables.js

import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import {connect} from 'react-redux'

const Cable = (props) => {
  return (
    <Fragment>
      {props.chat.conversations.map((conversation, index) => {
        return (
          <ActionCableConsumer 
            onDisconnected={(res)=> {
              console.log(`triggered on disconnected`)
              console.log(res)
            }}
            key={index}  
            channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
            onReceived={(res)=>{
              console.log(`triggered onreceived`)
              console.log(res)
            }}
          />
        );
      })}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
      chat: state.chat,
      auth: state.auth
  };
};
export default connect(mapStateToProps)(Cable);
