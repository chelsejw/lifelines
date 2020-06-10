import React from 'react';
import {NavLink} from 'react-router-dom'

const Nav = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
  <a className="navbar-brand" href="#">Lifelines</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact>Home</NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact className="nav-link" to="/appeals">Appeals</NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact className="nav-link" to="/appeals/new">New Appeal</NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    )

}

export default Nav