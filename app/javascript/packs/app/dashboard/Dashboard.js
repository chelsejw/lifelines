import React from 'react'
import ProfileForm from './ProfileForm'
import VerificationForm from './VerificationForm'
import {Link, Route, useRouteMatch} from 'react-router-dom'
import {connect} from 'react-redux'
import ConsoleContainer from './Console/ConsoleContainer'

const Dashboard = (props)=> {
    let { path, url } = useRouteMatch();

    if (!props.auth.isLoggedIn) {

      return (
        <div className="py-4 container">
          <h3>You have to be logged in to view this page.</h3>
        </div>
      )
    }

    return (
      <div className="py-4 container">
        <div className="row mb-3 mx-auto">
          <Link to={`${url}/profile`}>Profile</Link>

          {props.auth.currentUser.profile.account_type !== "admin" && (
            <Link to={`${url}/verification`}>Verification</Link>
          )}
          {props.auth.currentUser.profile.account_type !== "user" && (
            <Link to={`${url}/manage_requests`}>Manage Requests</Link>
          )}
        </div>

        <Route path="/dashboard/profile" exact component={ProfileForm} />

        <Route
          path={`${url}/verification`}
          exact
          component={VerificationForm}
        />
        <Route
          path={path}
          exact
          render={() => (
            <div className="container">
              <h1>Pick an option above to get started.</h1>
            </div>
          )}
        />

        <Route path="/dashboard/manage_requests" exact component={ConsoleContainer} />
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Dashboard);