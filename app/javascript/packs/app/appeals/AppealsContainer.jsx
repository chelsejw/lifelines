import React, {useState, useEffect} from 'react'
import AppealResults from './components/AppealResults'
import FocusedAppeal from './components/FocusedAppeal'
import { connect } from 'react-redux';
import { fetchAllAppeals } from '../../app/appeals/actions'
import ClipLoader from "react-spinners/ClipLoader";
import {Switch, Route, useRouteMatch} from 'react-router-dom'

const AppealsContainer = (props) => {

  useEffect(()=> {
    props.fetchInitialAppeals('/api/v1/appeals.json');
  }, [])
      
      let {path, url} = useRouteMatch();

      console.log(`MY PATH IS.. ${path}`)
      console.log(path + "/appealId")
        return (
          <div className="container-fluid">
            <div className="row">
              <AppealResults
                data={props.appeals.data}
                hasError={props.appeals.hasErrored}
                isLoading={props.appeals.isLoading}
              />

              <div className="col-7 mt-2">
                {props.appeals.focusedIsLoading && (
                  <ClipLoader
                    size={150}
                    color={"#123abc"}
                    loading={props.appeals.focusedIsLoading}
                  />
                )}
                {props.appeals.focusedHasErrored &&
                  "There was an error getting the appeal"}

                  <Route path={`${path}/:appealId`} component={FocusedAppeal}/>
              </div>
            </div>
          </div>
        );
      }


const mapStateToProps = (state) => {
    return {
        appeals: state.appeals,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitialAppeals: (url) => {
          console.log(`Fetch appeals ran`)
          dispatch(fetchAllAppeals(url))
        },
        fetchOneAppeal: url => {
          dispatch(fetchOneAppeal(url))
        }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppealsContainer);