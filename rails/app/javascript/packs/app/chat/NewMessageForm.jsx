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
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      console.log(`ERRROORRRRRRRRR`)
    })
    this.setState({ text: "" });
           var elem = document.querySelector(".messages");
           console.log(elem);
           elem.scrollTop = elem.scrollHeight;
  };

  render = () => {
    return (
      <div className="newMessageForm container-fluid p-4 bg-light">
        <div className="row">
          <div className="col-10">
            <input
              className="message-input w-100"
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-2">
            <button
              onClick={this.handleSubmit}
              className="send-btn bg-danger text-white"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default NewMessageForm;
