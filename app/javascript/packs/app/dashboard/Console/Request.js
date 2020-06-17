import React from 'react'


const Request = (props) => {

  const documentLinks = props.request.documents.map( (document, index) => {
    return <li><a href={document.url}>Document {index+1}</a></li>
  })

    return (
      <div>
        {props.request.user.profile.display_name} (email:{" "}
        {props.request.user.email}) is requesting{" "}
        {props.request.verification_for} verification
        <br />
        {documentLinks.length !== 0 ? (
          <ul>{documentLinks}</ul>
        ) : (
          <p>There are no documents for this request.</p>
        )}
        <br />
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
    );
    }

    export default Request