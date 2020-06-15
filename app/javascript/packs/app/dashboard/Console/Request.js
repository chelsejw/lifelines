import React from 'react'


const Request = (props) => {

    return (
         <div>
          {props.request.user.profile.display_name} requesting verification for {props.request.verification_for} <br />
          <button
            onClick={() => props.approve(props.request.id)}
            className="btn btn-success btn-sm"
          >
            Approve
          </button>
          <button
            onClick={() => props.reject(props.request.id)}
            className="btn btn-danger btn-sm"
          >
            Reject
          </button>
        </div>
    )
    }

    export default Request