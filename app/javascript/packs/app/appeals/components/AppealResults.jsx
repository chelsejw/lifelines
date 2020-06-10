import React from 'react'
import AppealListing from './AppealListing'
import ClipLoader from "react-spinners/ClipLoader";

const AppealResults = (props) => {

        let results = props.data.map((appeal) => {
                  return <AppealListing key={appeal.id} appeal={appeal}/>
        })

        return (
          <div className="col appeal-results-column">
          <h3>Look for Appeals</h3>
          <ul>
            {props.isLoading &&  <ClipLoader
          size={150}
          color={"#123abc"}
          loading={props.isLoading}
        />}
            {props.hasErrored && "Error occured"}
            {results}
          </ul>
        </div>
        )
}

export default AppealResults

