import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
const AppealOptions = (props)=> {

    return (
        <div className="row bg-light">
        <div className="col px-5 py-3">
          Your Current Location: {props.locString}
          <div className="mt-2">
            {props.loadingLoc ? (
              <div>
                Getting your location...{" "}
                <GridLoader size={3} color="gray" />
              </div>
            ) : (
              <button
                className="btn btn-dark btn-sm"
                onClick={props.getMyLocation}
              >
                Get My Location
              </button>
            )}
            {props.auth.isLoggedIn && props.auth.currentUser.profile.address !== null &&  props.auth.currentUser.profile.address!=="" && (
              <button
                className="ml-1 btn btn-secondary btn-sm"
                onClick={props.useMyAddress}
              >
                Use My Postal Code
              </button>
            )}
          </div>
        </div>
        <div className="col x-5 py-3">
            <select onChange={(e) => props.sort(e.target.value)}>
                <option value="newest">By newest</option>
                <option value="oldest">By oldest</option>
            </select>
        </div>
      </div>
    )
}

export default AppealOptions