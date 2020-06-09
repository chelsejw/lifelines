// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import store from './redux/store'
import { Provider } from "react-redux";

  ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
