import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import {fetchLifelineData, throwLifeline} from '../actions'

const FocusedAppeal = (props) => {

    useEffect(()=> {
        console.log(`use effect triggered`)
        props.fetchLifelineData(props.data.id);
    }, [props.appeal.id, props.throwLifelineData])

    return (
        <div>
            <h3>Needed: {props.data.species.name} donor needed to save {props.data.pet_name}!</h3>
            <img src={props.data.img_url} className="img-fluid"/>
            <p>{props.data.description}</p>
    {props.auth.isLoggedIn && !props.lifelines.isUserConnected && <button onClick={()=> {props.throwLifeline(props.auth.currentUser, props.data.user, props.data.id)}} className="btn btn-big btn-warning">Throw A Lifeline!</button>}
    {props.auth.isLoggedIn && props.lifelines.isUserConnected && <button className="btn btn-lg btn-danger">See Chat</button>}
    {!props.auth.isLoggedIn && <a href="/users/sign_in"><button className="btn btn-big btn-warning">Login now to help!</button></a>}

    {props.throwLifelineData.success && <p>Thank you for throwing a lifeline! Start a conversation.</p>}
    
        </div>
    )
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
        checkAuth: ()=>{
          dispatch(checkAuth());
        },
        fetchLifelineData: (appealId)=>{
            dispatch(fetchLifelineData(appealId))
        },
        throwLifeline: (user, appealOwner, appealId) =>{
            dispatch(throwLifeline(user, appealOwner, appealId))
        }
    };
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(FocusedAppeal)
