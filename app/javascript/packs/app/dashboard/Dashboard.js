import React from 'react'
import ProfileForm from './ProfileForm'
import VerificationForm from './VerificationForm'
import {Link, Route, useRouteMatch} from 'react-router-dom'
import {connect} from 'react-redux'


const Dashboard = (props)=> {
    let { path, url } = useRouteMatch();

    return (
      <div className="py-2 container">

        <div className="row w-75 mx-auto">
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
          render={() => <h1>Pick an option above to get started.</h1>}
        />

      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Dashboard);