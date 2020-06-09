import React from 'react';
import Nav from './components/Nav'
import AppealResults from './components/AppealResults'


class App extends React.Component {
  render(){
    return (
        <div>
            <Nav/>
            <div className="container-fluid">
              <div className="row">

                <div className="col">
                  <h3>Look for Appeals</h3>
                  <ul>
                    <AppealResults/>
                  </ul>
                </div>

                <div className="col">

                  Hello put your appeals here

                </div>
              

              </div>
            </div>
        </div>
    )
  }
}

export default App;
