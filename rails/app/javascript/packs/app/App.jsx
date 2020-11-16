import React from 'react';
import Nav from './layouts/Nav'
import AppealsContainer from './appeals/AppealsContainer'
import AppealForm from './forms/AppealForm/AppealForm'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Chat from './chat/Chat'
import Dashboard from './dashboard/Dashboard'
import UserProfile from './profile/UserProfile'
import Landing from './layouts/Landing'

class App extends React.Component {
  render(){
    return (
      <Router>
        <Nav />
        <div className="container-fluid">
          <Route path="/new/appeal" exact component={AppealForm} />
          <Route path="/edit/appeal/:id" exact component={AppealForm} />
          <Route path="/users/:id" exact component={UserProfile} />
          <Route path="/" exact component={Landing}/>
          <Route path="/appeals" component={AppealsContainer} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/chats" exact component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
