
import React from 'react';
import axios from 'axios'

class NewConversationForm extends React.Component {
  state = {
    title: ''
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    const token = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;  
    axios.post(`/conversations`, this.state)
    .then((res)=>{
      console.log(`was there a response?`)
      console.log(`res,`, res.data)
    })
    .catch(err => {
      console.log(`error in post request`)
      console.log(err.response)
    })

    this.setState({ title: '' });
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;