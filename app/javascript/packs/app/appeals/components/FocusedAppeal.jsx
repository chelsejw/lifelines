import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {fetchOneAppeal, fetchLifelineData, throwLifeline} from '../actions'
import { setActiveConversation } from "../../auth/actions";
import axios from 'axios'
import {useParams, NavLink} from 'react-router-dom'

const FocusedAppeal = (props) => {
  let {appealId} = useParams();
    useEffect(()=> {
        console.log(`use effect triggered`)
        props.fetchOneAppeal(appealId)
    }, [])

    useEffect(()=> {
      console.log(`Lifeline useeffect`)
      props.fetchLifelineData(appealId);
    }, [props.throwLifelineData, props.appeal])

    
    return (
      <div className="">
        <h3>
          {props.appeal.species.name} donor needed to save{" "}
          {props.appeal.pet_name}!
        </h3>
        <img src={props.appeal.img_url} className="img-fluid" />
        <p>{props.appeal.description}</p>

        {props.auth.isLoggedIn && !props.lifelines.isUserConnected && (
          <button
            onClick={() => {
              props.throwLifeline(
                props.auth.currentUser,
                props.appeal.user,
                props.appeal.id
              );
            }}
            className="btn btn-warning"
          >
            Throw A Lifeline!
          </button>
        )}

        {props.auth.isLoggedIn && props.lifelines.isUserConnected && (
          <NavLink
            onClick={() => {
              props.setActiveConversation(props.lifelines.conversation_id);
            }}
            className="btn btn-danger"
            to="/chats"
          >
            See Your Chats
          </NavLink>
        )}
        {!props.auth.isLoggedIn && (
          <a href="/users/sign_in">
            <button className="btn btn-warning">Login now to help!</button>
          </a>
        )}

        {props.throwLifelineData.success && (
          <p>Thank you for throwing a lifeline! Start a conversation.</p>
        )}
      </div>
    );
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        appeal: state.appeals.focusedData,
        lifelines: state.appeals.focusedLifeline,
        throwLifelineData: state.appeals.throwLifeline
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      checkAuth: () => {
        dispatch(checkAuth());
      },
      fetchLifelineData: (appealId) => {
        dispatch(fetchLifelineData(appealId));
      },
      throwLifeline: (user, appealOwner, appealId) => {
        dispatch(throwLifeline(user, appealOwner, appealId));
      },
      setActiveConversation: (convoId) => {
        dispatch(setActiveConversation(convoId));
      },
      fetchOneAppeal: (appealId) => {
        dispatch(fetchOneAppeal(appealId))
      }
    };
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(FocusedAppeal)
