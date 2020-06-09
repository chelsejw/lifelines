import React from `react`;
import ReactDOM from 'react-dom'

const App = ()=> {

    return (
        <div>
            <h1>This is my app.</h1>
        </div>
    )
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <App/>,
      document.body.appendChild(document.createElement('div')),
    )
  })
  