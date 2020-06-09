import React from 'react'

const AppealListing = (props) => {

    return (
        <div className="media">
        <img src="..." className="mr-3" alt="..."/>
            <div className="media-body">
            <h5 className="mt-0">{props.appeal.species.name} donor needed at {props.appeal.clinic.name}</h5>
                {props.appeal.description}
            </div>
        </div>
    )

}

export default AppealListing