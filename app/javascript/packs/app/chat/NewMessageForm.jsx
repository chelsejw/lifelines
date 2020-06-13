import React from "react";
import { API_ROOT, HEADERS } from "./constants";
import axios from 'axios'

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
            const token = document.querySelector("[name=csrf-token]").content;
            axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
    axios.
    post(`${API_ROOT}/messages`, {text: this.state.text, conversation_id: this.state.conversation_id})
    .then(res => {
      console.log(`response from post message`)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
      console.log(`ERRROORRRRRRRRR`)
    })
    this.setState({ text: "" });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
