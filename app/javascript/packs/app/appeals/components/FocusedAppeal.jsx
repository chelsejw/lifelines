import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {fetchOneAppeal, fetchLifelineData, throwLifeline} from '../actions'
import { setActiveConversation } from "../../auth/actions";
import axios from 'axios'
import {useParams, NavLink, useLocation} from 'react-router-dom'

const FocusedAppeal = (props) => {

  let location = useLocation();
  let appealIdParams = location.pathname.slice(9);
  const [appealId, setAppealId] = useState(appealIdParams);
  const [appeal, setAppeal] = useState({
    id: "",
    species: "",
    clinic: "",
    species: "",
    pet_name: "",
    user: "",
    img_url: ""
  });

  useEffect(()=> {
    console.log(`triggered location useEffect, params: ${appealIdParams}`)
    setAppealId(appealIdParams)
  }, [location])

    useEffect(() => {
       axios.get(`/api/v1/appeals/${appealId}`)
       .then(res => {
         setAppeal(res.data)
         setAppealId(res.data.id)
         console.log(`MADE REQUEST`)
                  console.log(res.data);

       })
       .catch(err => {
         console.log(err)
       })
    }, [appealId]);

    useEffect(() => {
      props.fetchLifelineData(appealId);
    }, [props.throwLifelineData, appeal, location]);

    
    return (
      <div className="">
        <h3>
          {appeal.species.name} donor needed to save{" "}
          {appeal.pet_name}!
        </h3>
        <img src={appeal.img_url} className="img-fluid" />
        <p>{appeal.description}</p>

        {props.auth.isLoggedIn && !props.lifelines.isUserConnected && appeal.status!=="closed" && props.auth.currentUser.user.id!==appeal.user.id &&(
          <button
            onClick={() => {
              props.throwLifeline(
                props.auth.currentUser,
                appeal.user,
                appeal.id
              );
            }}
            className="btn btn-warning"
          >
            Throw A Lifeline!
          </button>
        )}

        {appeal.status=="closed" && <p className="text-danger my-4">This appeal is closed.</p>}

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
