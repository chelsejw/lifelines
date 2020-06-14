import React, { useEffect, useState } from 'react'
import AppealListing from './AppealListing'
import MoonLoad from "react-spinners/MoonLoader";


const AppealResults = (props) => {

  const [userLoc, setUserLoc] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(`position`, position);
          let lat = position.coords.latitude
          let long = position.coords.longitude;
          setUserLoc({lat, long})
        },
        (err) => {
          console.log(`Err in geolocation`);
          console.log(err);
        }
      );
    }
  });

        let results = props.data.map((appeal) => {
                  return (
                    <AppealListing
                      key={appeal.id}
                      appeal={appeal}
                      geolocation={userLoc}
                    />
                  );
        })

        return (
          <div className="col-5">
            {props.isLoading &&  <div className="mx-auto w-50"><MoonLoad
          size={150}
          color={"red"}
          loading={props.isLoading}
        /></div>}
            {props.hasErrored && "Error occured"}
            <div className="p-3  appeal-results-column">
            {results}

            </div>
        </div>
        )
}

export default AppealResults

