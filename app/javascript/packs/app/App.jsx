import React from 'react';
import Nav from './layouts/Nav'
import AppealsContainer from './appeals/AppealsContainer'
import AppealForm from './forms/AppealForm/AppealForm'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Chat from './chat/Chat'
import Dashboard from './dashboard/Dashboard'

class App extends React.Component {
  render(){
    return (
        <Router>
            <Nav/>
            <Route path="/new/appeal" exact component = {AppealForm}/>
            <Route path="/edit/appeal/:id" exact component = {AppealForm}/>
            <Route path="/appeals" exact component = {AppealsContainer}/>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/chats" exact component = {Chat}/>
        </Router>
    )
  }
}

export default App;
