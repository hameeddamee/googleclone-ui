import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

let mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
