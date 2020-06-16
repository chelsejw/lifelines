import React from 'react'
import ProfileForm from './ProfileForm'
import VerificationForm from './VerificationForm'
import {NavLink, Route, useRouteMatch} from 'react-router-dom'
import {connect} from 'react-redux'
import ConsoleContainer from './Console/ConsoleContainer'
import AppealsSummary from './AppealsSummary'
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
      <div className="pb-4">
        <div className="row py-4 mb-4 bg-danger">
          <div className="w-75 mx-auto text-center dashboard-path">
            <NavLink
              exact
              className="dashboard-path mx-3"
              to={`${url}/profile`}
            >
              Profile
            </NavLink>
            <NavLink
              exact
              className="dashboard-path mx-3"
              to={`${url}/appeals`}
            >
              Appeals
            </NavLink>

            {props.auth.currentUser.profile.account_type !== "admin" && (
              <NavLink
                exact
                className="dashboard-path mx-3"
                to={`${url}/verification`}
              >
                Verification
              </NavLink>
            )}
            {props.auth.currentUser.profile.account_type !== "user" && (
              <NavLink
                exact
                className="dashboard-path mx-3"
                to={`${url}/manage_requests`}
              >
                Manage Requests
              </NavLink>
            )}
          </div>
        </div>
        <div className="container">
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
              <div className="text-center pt-5">
                <h1 className="text-secondary display-4">
                  Pick an option above to get started.
                </h1>
              </div>
            )}
          />

          <Route path="/dashboard/appeals" exact component={AppealsSummary} />
          <Route
            path="/dashboard/manage_requests"
            exact
            component={ConsoleContainer}
          />
        </div>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Dashboard);