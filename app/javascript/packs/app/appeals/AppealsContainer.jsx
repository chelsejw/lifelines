import React, {useState, useEffect} from 'react'
import AppealResults from './components/AppealResults'
import FocusedAppeal from './components/FocusedAppeal'
import { connect } from 'react-redux';
import { fetchAllAppeals } from '../../app/appeals/actions'
import BarLoader from "react-spinners/BarLoader";
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
    const [sortErrors, setSortErrors] = useState(false)
    const [currentSort, setCurrentSort] = useState("newest")
    const [sortErrorMessage, setSortErrorMessage] = useState("")
    const [originalData, setOriginalData] = useState([])
    const [filters, setFilters] = useState({
      includeClosed: false,
      onlyVerified: false
    })

  useEffect(()=> {
    props.fetchInitialAppeals('/api/v1/appeals.json');
    
    axios.get('/api/v1/appeals.json').then(res => {
      setOriginalData(res.data)

      const openAppeals = res.data.filter(appeals => appeals.status!=="closed")
      setAppeals(openAppeals)
    }).catch(err => console.log(err))
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

  useEffect(()=> {
    console.log(`Filters:`, filters)
    console.log(`Current sort`, currentSort)
        setSortErrors(false);

    let newAppeals = [...originalData]

    //exclude closed
    if (!filters.includeClosed) {
      newAppeals = newAppeals.filter(appeal => appeal.status!=="closed")
    }

    if (filters.onlyVerified) {
      newAppeals = newAppeals.filter(appeal => appeal.user.profile.verified)
    }


    if (currentSort == "oldest") {
      newAppeals.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? 1 : -1
      );
    }
    if (currentSort == "newest") {
      newAppeals.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      );
    }
    if (currentSort == "closest") {
      if (!newAppeals[0].distance) {
        setSortErrors(true);
        return setSortErrorMessage(
          "Sorry, please make sure you have clicked on the Get My Location button, or if you have given a postal code, click Use My Postal Code."
        );
      }
      newAppeals.sort((a, b) => {
        let distA = parseFloat(a.distance)
        let distB = parseFloat(b.distance)                
        distA > distB ? 1 : -1
      })
    }
    if (currentSort == "popular") {
      newAppeals.sort((a, b) =>
        parseInt(a.lifelines.length) > parseInt(b.lifelines.length) ? -1 : 1
      );
    }
    if (currentSort == "least_popular") {
      newAppeals.sort((a, b) =>
        parseInt(a.lifelines.length) > parseInt(b.lifelines.length) ? 1 : -1
      );
    }

    return setAppeals([...newAppeals]);
  }, [currentSort, filters])


  const sort = (option)=> {
    setCurrentSort(option)
  }

  const filter = (option, bool) => {

    setFilters( prevOptions => {
      return {
        ...prevOptions,
        [option]: bool
      }
    })

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

  const setDistance = (index, distance) => {

    console.log(`setDistance for appeal at index ${index} for ${distance}`)
    const newArr = [...originalData]
    newArr[index].distance = distance
    return setOriginalData(newArr)
  }
  
  useEffect(()=> {
    appeals.forEach(appeal => console.log(appeal))
  }, [appeals])
      
      let {path, url} = useRouteMatch();

        return (
          <div className="container-fluid">
              <AppealOptions filter={filter} sortErrors={sortErrors} sortErrorMessage={sortErrorMessage} appeals={appeals} sort={sort} loadingLoc={loadingLoc} auth={props.auth} getMyLocation={getMyLocation} locString={locString} useMyAddress={useMyAddress}/>

            <div className="row">
              <div className="col-5 px-5">
                <AppealResults
                  setDist={setDistance}
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
                  <BarLoader
                    width={100}
                    height={4}
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