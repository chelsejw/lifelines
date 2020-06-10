import React from 'react';
import Nav from './layouts/Nav'
import AppealsContainer from './appeals/AppealsContainer'
import AppealForm from './forms/AppealForm'
import { Route, BrowserRouter as Router } from 'react-router-dom'


class App extends React.Component {
  render(){
    return (
        <Router>
            <Nav/>
            <Route path="/appeals/new" exact component = {AppealForm}/>
            <Route path="/appeals/:id/edit" exact component = {AppealForm}/>
            <Route path="/appeals" exact component = {AppealsContainer}/>
            <Route path="/hello" exact render={()=> <h1>Hello</h1>} />
        </Router>
    )
  }
}

export default App;
