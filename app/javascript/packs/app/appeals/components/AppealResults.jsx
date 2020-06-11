import React from 'react'
import AppealListing from './AppealListing'
import MoonLoad from "react-spinners/MoonLoader";


const AppealResults = (props) => {

        let results = props.data.map((appeal) => {
                  return <AppealListing key={appeal.id} appeal={appeal}/>
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

