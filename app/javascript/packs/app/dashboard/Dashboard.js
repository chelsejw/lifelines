import React from 'react'
import ProfileForm from './ProfileForm'
import {Link, Route, useRouteMatch} from 'react-router-dom'
import {connect} from 'react-redux'


const Dashboard = (props)=> {
    let { path, url } = useRouteMatch();

    return (
      <div>
        <Link to={`${url}/profile`}>Profile</Link>

        {props.auth.currentUser.account_type !== "admin" && (
          <Link to={`${url}/verification`}>Verification</Link>
        )}

        <Route path="/dashboard/profile" exact component={ProfileForm} />

        <Route
          path={`${url}/verification`}
          exact
          render={() => <h1>Verifications</h1>}
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