import React from "react";
import moment from "moment";
import {Link} from 'react-router-dom'

const AppealElement = (props) => {

  return (
    <div className="media dashboard-appeal shadow-sm container my-2 pb-2">
      <div className="row">
        <div className="col-3 result-thumbnail">
          <Link to={`/appeals/${props.appeal.id}`}>
            <img
              onClick={() => {
                props.fetchOneAppeal(props.appeal.id);
              }}
              src={
                props.appeal.img_url !== "" && props.appeal.img_url
                  ? props.appeal.img_url
                  : "https://res.cloudinary.com/dwbuqa4dx/image/upload/v1592316118/logo1_bf4f9f.png"
              }
              className="mr-3"
              alt="..."
            />
          </Link>
        </div>
        <div className="media-body col-9">
          <div className="listing-header mt-2">
            For {props.appeal.pet_name} at {props.appeal.clinic.name}
          </div>
          <div>
            <br />
            Added {moment(props.appeal.created_at).fromNow()}
            <br />
            There are {props.appeal.lifelines.length} lifelines for this appeal.
            <br />
            Status:{" "}
            <span
              className={
                props.appeal.status == "open" ? "text-success" : "text-danger"
              }
            >
              {" "}
              {props.appeal.status}
            </span>
          </div>
          <Link
            className="btn btn-sm mt-1 btn-secondary"
            to={`/appeals/${props.appeal.id}`}
            exact
          >
            View Appeal
          </Link>
          <Link
            className="btn btn-sm ml-1 mt-1 btn-secondary"
            to={`/edit/appeal/${props.appeal.id}`}
            exact
          >
            Edit Your Appeal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppealElement;
