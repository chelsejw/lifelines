import React from 'react';
import Nav from './layouts/Nav'
import AppealResults from './components/appeals/AppealResults'
import { Route, BrowserRouter as Router } from 'react-router-dom'


class App extends React.Component {
  render(){
    return (
        <Router>
            <Nav/>
            <Route path="/appeals" component = {AppealResults}/>
            <Route path="/hello" exact render={()=> <h1>Hello</h1>} />
        </Router>
    )
  }
}

export default App;
