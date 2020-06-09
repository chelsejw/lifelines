import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav'
import axios from 'axios';

const App = ()=> {

    const [appeals, setAppeals] = useState(null)

    axios.get(`/products/search/${searchInput}`)
    .then((response) => {

      const data = response.data
      setResults(data)

    }).catch((error)=>{
      console.log(error);
    })
    
    return (
        <div>
            <Nav/>
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
  