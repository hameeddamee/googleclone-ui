import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { toastr } from "react-redux-toastr";

import { isEmpty } from "../../../shared/helpers/validationHelpers";
import * as authAction from "../../../redux/actions/authActions";
import config from "../../../config";

const AuthGoogleBtn = ({ isLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMsg = useSelector((state) => state.auth.errorMsg);

  useEffect(() => {
    toastr.clean();
    if (!isEmpty(errorMsg)) {
      toastr.error("Google Login Error", errorMsg, {
        onHideComplete: () => dispatch(authAction.clearMessages()),
      });
    }
  }, [errorMsg]);

  const responseSuccess = async (response) => {
    const {
      profileObj: { email, familyName, givenName, name, googleId, imageUrl },
    } = response;
    const userData = {
      formattedFirstName: givenName,
      formattedLastName: familyName,
      formattedfullNames: name,
      oauthId: googleId,
      email: email,
      oauthAvatar: imageUrl,
      oauthType: "google",
    };
    if (isLogin) {
      await dispatch(authAction.loginUserWithOauth(userData));
    } else {
      await dispatch(authAction.registerUserWithOauth(userData, history));
    }
  };

  const responseError = ({ error }) => {
    toastr.error("Google Login Error", error);
  };

  return (
    <GoogleLogin
      clientId={config.Auth0.google.clientId}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          type="button"
          className="account__social-btn"
        >
          <span className={`fa fa-google`} />
        </button>
      )}
      onSuccess={responseSuccess}
      onFailure={responseError}
      cookiePolicy="single_host_origin"
    />
  );
};

export default AuthGoogleBtn;
