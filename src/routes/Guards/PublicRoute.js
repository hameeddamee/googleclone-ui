import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...props} />;
};
let mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PublicRoute);
