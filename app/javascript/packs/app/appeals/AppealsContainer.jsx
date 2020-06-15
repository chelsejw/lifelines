import React, {useState, useEffect} from 'react'
import AppealResults from './components/AppealResults'
import FocusedAppeal from './components/FocusedAppeal'
import { connect } from 'react-redux';
import { fetchAllAppeals } from '../../app/appeals/actions'
import ClipLoader from "react-spinners/ClipLoader";
import { Route, useRouteMatch} from 'react-router-dom'
import { GoogleApiWrapper } from "google-maps-react";
import AppealOptions from './components/AppealOptions'
import axios from 'axios'

const AppealsContainer = (props) => {
    const [userLoc, setUserLoc] = useState(null);
    const [locString, setLocString] = useState("Unavailable")
    const [loadingLoc, setLoadingLoc] = useState(false)
    const [userPostal, setUserPostal] = useState("")
    const [appeals, setAppeals] = useState([])

  useEffect(()=> {
    props.fetchInitialAppeals('/api/v1/appeals.json');
    
    axios.get('/api/v1/appeals.json').then(res => setAppeals(res.data)).catch(err => console.log(err))
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

  const sort = (option)=> {

    let newAppeals = [...appeals]

    if (option=="oldest"){
      newAppeals.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ) ? 1 : -1)
      }
      if (option=="newest"){
        newAppeals.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ) ? -1 : 1)
        }

        return setAppeals([...newAppeals])
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
              <AppealOptions appeals={appeals} sort={sort} loadingLoc={loadingLoc} auth={props.auth} getMyLocation={getMyLocation} locString={locString} useMyAddress={useMyAddress}/>

            <div className="row">
              <div className="col-5 px-5">
                <AppealResults
                  userLoc={locString}
                  geolocation={userLoc}
                  postal={userPostal}
                  data={appeals}
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
        },
    };
  };
  
  const WrappedContainer = GoogleApiWrapper({
    apiKey: process.env.MAPS_API_KEY,
  })(AppealsContainer);
  export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer);