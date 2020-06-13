import React, { useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import {checkAuth} from '../auth/actions'
import { connect } from 'react-redux';
import axios from 'axios'

const Nav = (props) => {

  useEffect(()=>{
    
    props.checkAuth();
  }, [])


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
  <NavLink className="navbar-brand" to="/">Lifelines</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact>Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/chat" exact>Chats</NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact className="nav-link" to="/appeals">Appeals</NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact className="nav-link" to="/appeals/new">New Appeal</NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact className="nav-link" to="/profile">My Profile</NavLink>
      </li>
      {!props.auth.isLoggedIn && <li className="nav-item">
        <a className="nav-link" href="/users/sign_in">Sign In</a>
      </li>}
      {!props.auth.isLoggedIn && <li className="nav-item">
        <a className="nav-link" href="/users/sign_up">Sign Up</a>
      </li>}
      
  {props.auth.isLoggedIn && 
      <li className="nav-item">
        <a className="nav-link" href="/api/v1/auth/logout">Sign Out</a>
      </li>}
    </ul>
  </div>
</nav>
    )

}


const mapStateToProps = (state) => {
  return {
      auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      checkAuth: ()=>{
        dispatch(checkAuth());
      }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav)