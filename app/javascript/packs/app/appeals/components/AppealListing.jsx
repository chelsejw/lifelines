import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchOneAppeal } from '../actions'
import { Link, NavLink } from 'react-router-dom';
import Distance from './Distance'
import moment from 'moment'

const AppealListing = (props) => {
  
  const [calculatedDistance, setCalculatedDistance] = useState("");

    useEffect(() => {
    let destination = [props.appeal.clinic.address.split(" ").join("+")];
    let origin = ""

    if (props.geolocation!==null && props.geolocation!==""){
      origin = [{lat: props.geolocation.lat, lng: props.geolocation.lng}]
    }
    if (props.postal!=="" && props.postal!==null) {
      origin = [props.postal]
    }        
    if (origin!==""){
      const matrix = new props.google.maps.DistanceMatrixService();
      matrix.getDistanceMatrix(
            {
              origins: origin,
              destinations: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (res, status) => {
              setCalculatedDistance(
                status == "OK"
                  ? `${res.rows[0].elements[0].distance.text} | ${res.rows[0].elements[0].duration.text}`
                  : "Error in calculation"
              );

              props.setDist(props.appeal.id, res.rows[0].elements[0].distance.text)
            }
          );
        }
      }, [props.geolocation, props.postal]);


    return (
      <div className="media appeal-listing container p-2">
        <div className="row">
          <div className="col-3 result-thumbnail">
            <Link to={`/appeals/${props.appeal.id}`}>
              <img
                onClick={() => {
                  props.fetchOneAppeal(props.appeal.id);
                }}
                src={
                  props.appeal.img_url !== "" && props.appeal.img_url
                    ? props.appeal.img_url
                    : "https://res.cloudinary.com/dwbuqa4dx/image/upload/v1592316118/logo1_bf4f9f.png"
                }
                className="mr-3"
                alt="..."
              />
            </Link>
          </div>
          <div className="media-body col-9">
            <div className="listing-header mt-2">
              <Link className="text-dark" to={`/appeals/${props.appeal.id}`}>
                {props.appeal.species.name} donor needed at{" "}
                {props.appeal.clinic.name}
              </Link>
            </div>
            <div>
              From:{" "}
              <Link
                className="text-secondary"
                to={`/users/${props.appeal.user.id}`}
              >
                {props.appeal.user.profile.display_name}{" "}
                {props.appeal.user.profile.verified && (
                  <i class="fas fa-user-check text-success"></i>
                )}
              </Link>
              <br />
              Added {moment(props.appeal.created_at).fromNow()}
              <br />
              Status:{" "}
              <span
                className={
                  props.appeal.status == "open" ? "text-success" : "text-danger"
                }
              >
                {" "}
                {props.appeal.status}
              </span>
            </div>

            <Distance distance={calculatedDistance} />
            {props.auth.currentUser.user.id == props.appeal.user.id && (
              <NavLink
                className="btn btn-sm mt-1 btn-secondary"
                to={`/edit/appeal/${props.appeal.id}`}
                exact
              >
                Edit Your Appeal
              </NavLink>
            )}
          </div>
        </div>
      </div>
    );

}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOneAppeal: (url) => {
          dispatch(fetchOneAppeal(url))
        }
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(AppealListing);