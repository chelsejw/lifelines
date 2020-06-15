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
            }
          );
        }
      }, [props.geolocation, props.postal]);


    return (
      <div className="media appeal-listing container shadow-sm my-2">
        <div className="row">
          <Link to={`/appeals/${props.appeal.id}`}>
            <img
              onClick={() => {
                props.fetchOneAppeal(props.appeal.id);
              }}
              src={props.appeal.img_url}
              className="mr-3 result-thumbnail"
              alt="..."
            />
          </Link>
          <div className="media-body col-9">
            <h5 className="mt-2">
              {props.appeal.species.name} donor needed at{" "}
              {props.appeal.clinic.name}
            </h5>
            <p>From: {props.appeal.user.profile.display_name}</p>
            <p>Added: {moment(props.appeal.created_at).format("MMM Do YYYY, h:mm:ss a")}</p>
            <Distance distance={calculatedDistance}/>
            <div
              className={`btn btn-sm ${
                props.appeal.status == "open" && "btn-success"
              } ${props.appeal.status == "closed" && "btn-danger"}`}
            >
              {props.appeal.status == "open" ? "Open" : "Closed"}
            </div>

            {props.auth.currentUser.user.id == props.appeal.user.id && (
              <NavLink
                className="btn btn-sm btn-dark"
                to={`/edit/appeal/${props.appeal.id}`}
                exact
              >
                Edit Appeal
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