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
    setAppealId(appealIdParams)
  }, [location])

    useEffect(() => {
       axios.get(`/api/v1/appeals/${appealId}`)
       .then(res => {
         setAppeal(res.data)
         setAppealId(res.data.id)
       })
       .catch(err => {
         console.log(err)
       })
    }, [appealId]);

    useEffect(() => {
      props.fetchLifelineData(appealId);
    }, [props.throwLifelineData, appeal, location]);

    
    return (
      <div className="w-75 mx-auto pb-4">
        <div className="text-center mb-4">
          <h3>
            Appeal for: {appeal.pet_name} the {appeal.species.name}
          </h3>
          <img src={appeal.img_url} className="img-fluid" />
        </div>

        <div className="my-3">
          <h5>Description</h5>
          {appeal.description
            ? appeal.description
            : "This user did not include a description."}
        </div>
        <hr />

        <div>
          <h5> Clinic Details </h5>
          <span className="font-weight-bold">{appeal.clinic.name}</span>
          <br />
          <i className="fas fa-clinic-medical mr-2 text-secondary"></i>
          {appeal.clinic.address}
          <br />
          <i class="fas fa-phone mr-2 text-secondary"></i>
          {appeal.clinic.phone}
        </div>
        <hr />

        <div className="my-4 share-link-footer">
          <h5>Can't help? Share the appeal!</h5>
          <button
            onClick={() => {
              let url = document.getElementById("appealUrl");
              url.select();
              url.setSelectionRange(0, 99999); /*For mobile devices*/

              /* Copy the text inside the text field */
              document.execCommand("copy");

              /* Alert the copied text */
              alert("Copied the link!");
            }}
            className="btn btn-sm btn-link"
          >
            Copy Link
          </button>
          <input
            id="appealUrl"
            className="share-link w-75"
            type="text"
            value={`http://lifelines.herokuapp.com/appeals/${appeal.id}`}
          />
        </div>

        {props.auth.isLoggedIn &&
          !props.lifelines.isUserConnected &&
          appeal.status !== "closed" &&
          props.auth.currentUser.user.id !== appeal.user.id && (
            <div className="text-center">
              <p>
                If you have an eligible pet, click "Throw A Lifeline" to start a
                conversation!
              </p>
              <button
                onClick={() => {
                  props.throwLifeline(
                    props.auth.currentUser.user,
                    appeal.user,
                    appeal.id
                  );
                }}
                className="btn btn-block btn-danger my-2"
              >
                <i class="fas fa-heartbeat mr-1"></i> Throw A Lifeline!
              </button>
            </div>
          )}

        {appeal.status == "closed" && (
          <p className="text-danger my-4">This appeal is closed.</p>
        )}

        {props.auth.isLoggedIn && props.lifelines.isUserConnected && (
          <NavLink
            onClick={() => {
              props.setActiveConversation(props.lifelines.conversation_id);
            }}
            className="btn btn-danger btn-block"
            to="/chats"
          >
            You have a conversation for this appeal.
          </NavLink>
        )}
        {!props.auth.isLoggedIn && (
          <a href="/users/sign_in">
            <button className="btn btn-dark btn-block">
              Login now to help!
            </button>
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
