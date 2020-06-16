import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
const AppealOptions = (props)=> {

    return (
      <div className="options-div row bg-light">
        <div className="col">
          <div className="pt-3 pb-1">
            <div className="font-weight-bold mb-1">Sort By</div>

            {props.sortErrors && (
              <p className="text-danger">{props.sortErrorMessage}</p>
            )}

            <select
              className="w-75 form-control mb-3"
              onChange={(e) => props.sort(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="closest">Closest to me</option>
              <option value="least_popular">Least Popular First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular First</option>
            </select>

            <label className="switch mr-2">
              <input
                id="includeClosed"
                onChange={(e) => props.filter(e.target.name, e.target.checked)}
                name="includeClosed"
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
            <label htmlFor="includeClosed">Include closed appeals</label>
            <label className="switch mx-2">
              <input
                id="onlyVerified"
                onChange={(e) => props.filter(e.target.name, e.target.checked)}
                name="onlyVerified"
                type="checkbox"
              />{" "}
              <span className="slider round"></span>
            </label>
            <label htmlFor="onlyVerified">Only verified appeals</label>
          </div>
          <hr />
          Your Current Location: {props.locString}
          <div className="mt-2">
            {props.loadingLoc ? (
              <div>
                Getting your location... <GridLoader size={3} color="gray" />
              </div>
            ) : (
              <button
                className="btn btn-dark btn-sm"
                onClick={props.getMyLocation}
              >
                Get My Location
              </button>
            )}
            {props.auth.isLoggedIn &&
              props.auth.currentUser.profile.address !== null &&
              props.auth.currentUser.profile.address !== "" && (
                <button
                  className="ml-1 btn btn-secondary btn-sm"
                  onClick={props.useMyAddress}
                >
                  Use My Postal Code
                </button>
              )}
          </div>
        </div>
      </div>
    );
}

export default AppealOptions