import React from 'react'
import { connect } from 'react-redux';
import { fetchOneAppeal } from '../actions'
import { NavLink } from 'react-router-dom';
import '../css/appeals.scss'

const AppealListing = (props) => {

    return (
        <div className="media appeal-listing container shadow-sm my-2 p-2">
            <div className="row">
                <img onClick={()=> {props.fetchOneAppeal(props.appeal.id)}} src={props.appeal.img_url} className="mr-3 result-thumbnail" alt="..."/>
                <div className="media-body col-9">
                    <h5 className="mt-0">{props.appeal.species.name} donor needed at {props.appeal.clinic.name}</h5>
                    <p>From: {props.appeal.user.profile.display_name}</p>
                     <div className={`btn btn-sm ${props.appeal.status=="open" && 
                    "btn-success"} ${props.appeal.status=="closed" && 
                    "btn-danger"}`}>{props.appeal.status=="open" ? 
                    "Open" : "Closed"}</div>
                    <NavLink className="btn btn-sm btn-dark"
                     to={`/appeals/${props.appeal.id}/edit`} exact>Edit Appeal</NavLink>
                </div>
            </div>
        </div>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOneAppeal: (url) => {
          dispatch(fetchOneAppeal(url))
        }
    };
  };
  

export default connect(null, mapDispatchToProps)(AppealListing)