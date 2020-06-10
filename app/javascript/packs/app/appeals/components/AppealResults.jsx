import React from 'react'
import AppealListing from './AppealListing'

const AppealResults = (props) => {

        let results = props.data.map((appeal) => {
                  return <AppealListing key={appeal.id} appeal={appeal}/>
        })

        return (
          <div className="col">
          <h3>Look for Appeals</h3>
          <ul>
            {props.isLoading && "LOADING"}
            {props.hasErrored && "Error occured"}
            {results}
          </ul>
        </div>
        )
}

export default AppealResults

