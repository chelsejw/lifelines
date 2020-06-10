import React from 'react'
import { connect } from 'react-redux';
import { fetchOneAppeal } from '../actions'

const AppealListing = (props) => {

    return (
        <div className="media container">
            <div className="row">
                <img onClick={()=> {props.fetchOneAppeal(props.appeal.id)}} src={props.appeal.img_url} className="mr-3 col-3 img-fluid" alt="..."/>
                <div className="media-body col-9">
                    <h5 className="mt-0">{props.appeal.species.name} donor needed at {props.appeal.clinic.name}</h5>
                    {props.appeal.description}
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