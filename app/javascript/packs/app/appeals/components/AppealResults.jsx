import React from 'react'
import AppealListing from './AppealListing'
import MoonLoad from "react-spinners/MoonLoader";


const AppealResults = (props) => {

        let results = props.data.map((appeal) => {
                  return <AppealListing key={appeal.id} appeal={appeal}/>
        })

        return (
          <div className="col appeal-results-column">
            {props.isLoading &&  <div className="mx-auto w-50 p-5"><MoonLoad
          size={150}
          color={"red"}
          loading={props.isLoading}
        /></div>}
            {props.hasErrored && "Error occured"}

            {results}
        </div>
        )
}

export default AppealResults

