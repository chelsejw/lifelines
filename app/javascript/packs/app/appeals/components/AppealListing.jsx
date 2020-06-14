import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchOneAppeal } from '../actions'
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios'

const AppealListing = (props) => {

  const [distance, setDistance] = useState("")

  const fetchDistance = () => {

    let service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origin: `${props.geolocation.lat}|${props.geolocation.long}`,
      destination: `${props.appeal.clinic.address.split(' ').join('+')}`,
      travelMode: 'DRIVING',
      unitSytem: google.maps.UnitSystem.METRIC,
    }, (res, status)=>{
      console.log(`status is`, status)
      console.log(res)
    })

  };


  useEffect(()=> {
    props.geolocation!==null && fetchDistance();
  }, [])

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
            <h5 className="mt-0">
              {props.appeal.species.name} donor needed at{" "}
              {props.appeal.clinic.name}
            </h5>
            <p>From: {props.appeal.user.profile.display_name}</p>
            <p>Distance from you: {distance}</p>
            <div
              className={`btn btn-sm ${
                props.appeal.status == "open" && "btn-success"
              } ${props.appeal.status == "closed" && "btn-danger"}`}
            >
              {props.appeal.status == "open" ? "Open" : "Closed"}
            </div>

            {props.auth.currentUser.id == props.appeal.user.id && (
              <NavLink
                className="btn btn-sm btn-dark"
                to={`/appeals/${props.appeal.id}/edit`}
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