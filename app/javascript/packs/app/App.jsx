import React from 'react';
import Nav from './layouts/Nav'
import AppealsContainer from './appeals/AppealsContainer'
import AppealForm from './forms/AppealForm/AppealForm'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Chat from './chat/Chat'
import {ActionCableConsumer} from 'react-actioncable-provider'

class App extends React.Component {
  render(){
    return (
        <Router>
            <Nav/>
            <Route path="/appeals/new" exact component = {AppealForm}/>
            <Route path="/appeals/:id/edit" exact component = {AppealForm}/>
            <Route path="/appeals" exact component = {AppealsContainer}/>
            <Route path="/profile" exact render={()=> <h1>My Profile</h1>} />
            <Route path="/chat" exact component = {Chat}/>
        </Router>
    )
  }
}

export default App;
