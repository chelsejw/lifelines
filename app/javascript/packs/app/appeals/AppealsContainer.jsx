import React, {useState, useEffect} from 'react'
import AppealResults from './components/AppealResults'
import FocusedAppeal from './components/FocusedAppeal'
import { connect } from 'react-redux';
import { fetchAllAppeals } from '../../app/appeals/actions'
import ClipLoader from "react-spinners/ClipLoader";
import GridLoader from 'react-spinners/GridLoader'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import { GoogleApiWrapper } from "google-maps-react";

const AppealsContainer = (props) => {

    const [userLoc, setUserLoc] = useState(null);
    const [locString, setLocString] = useState("Unavailable")
    const [loadingLoc, setLoadingLoc] = useState(false)
    const [userPostal, setUserPostal] = useState("")

    console.log(`Process env`, process.env.MAPS_API_KEY)
    console.log(`Process env`, process.env)

  useEffect(()=> {
    props.fetchInitialAppeals('/api/v1/appeals.json');
  }, [])

  const getMyLocation = () => {
        if (userPostal !== "" || userPostal !== null) {
          setUserPostal("");
        }
    setLoadingLoc(true)
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  let lat = position.coords.latitude;
                  let lng = position.coords.longitude;
                  let latlngObj = {
                      lat,
                      lng
                  };
                  setUserLoc(latlngObj);
                  getLocationString(latlngObj);
                  setLoadingLoc(false)
              },
              (err) => {
                  setUserLoc("Error getting your location.?");
              }
          );
      }
  }

  const useMyAddress = ()=> {
    if (userLoc!=="" || userLoc!==null ) {
      setUserLoc("")
    }
    setUserPostal(`Singapore+${props.auth.currentUser.profile.address}`);
    setLocString(`Singapore ${props.auth.currentUser.profile.address}`);
  }

  const getLocationString = (latlngObj)=>{
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          location: latlngObj
      }, (res, status) => {
          status !== "OK" ? console.log(`GOT A GEOCODE????`, res) : console.log(`Geocode error`, res);
          setLocString(res[0].formatted_address)
      });
  }
      
      let {path, url} = useRouteMatch();

        return (
          <div className="container-fluid">
            <div className="row bg-light">
              <div className="col px-5 py-3">
                Your Current Location: {locString}
                <div className="mt-2">
                  {loadingLoc ? (
                    <div>
                      Getting your location...{" "}
                      <GridLoader size={3} color="gray" />
                    </div>
                  ) : (
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={getMyLocation}
                    >
                      Get My Location
                    </button>
                  )}
                  {props.auth.isLoggedIn && props.auth.currentUser.profile.address !== null &&  props.auth.currentUser.profile.address!=="" && (
                    <button
                      className="ml-1 btn btn-secondary btn-sm"
                      onClick={useMyAddress}
                    >
                      Use My Postal Code
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-5 px-5">
                <AppealResults
                  userLoc={locString}
                  geolocation={userLoc}
                  postal={userPostal}
                  data={props.appeals.data}
                  hasError={props.appeals.hasErrored}
                  isLoading={props.appeals.isLoading}
                  google={props.google}
                />
              </div>

              <div className="col-7 px-5">
                {props.appeals.focusedIsLoading && (
                  <ClipLoader
                    size={150}
                    color={"#123abc"}
                    loading={props.appeals.focusedIsLoading}
                  />
                )}
                {props.appeals.focusedHasErrored &&
                  "There was an error getting the appeal"}

                <Route path={`${path}/:appealId`} component={FocusedAppeal} />
              </div>
            </div>
          </div>
        );
      }


const mapStateToProps = (state) => {
    return {
        appeals: state.appeals,
        auth: state.auth
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitialAppeals: (url) => {
          console.log(`Fetch appeals ran`)
          dispatch(fetchAllAppeals(url))
        },
        fetchOneAppeal: url => {
          dispatch(fetchOneAppeal(url))
        }
    };
  };
  
  const WrappedContainer = GoogleApiWrapper({
    apiKey: process.env.MAPS_API_KEY,
  })(AppealsContainer);
  export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer);