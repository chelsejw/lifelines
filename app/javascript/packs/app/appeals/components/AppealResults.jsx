import React from 'react'
import AppealListing from './AppealListing'
import BarLoader from "react-spinners/BarLoader";

const AppealResults = (props) => {
        let results = props.data.map((appeal, index) => {
                  return (
                    <AppealListing
                    index={index}
                      key={appeal.id}
                      appeal={appeal}
                      geolocation={props.geolocation}
                      postal={props.postal}
                      google={props.google}
                      setDist={props.setDist}
                    />
                  );
        })

        return (
          <div>
            {props.isLoading && (
              <div className="mx-auto w-50">
                <BarLoader
                  width={300}
                  height={4}
                  color={"#123abc"}
                />
              </div>
            )}
            {props.hasErrored && "Error occured"}
            <div className="appeal-results-column">{results}</div>
          </div>
        );
}

export default AppealResults

