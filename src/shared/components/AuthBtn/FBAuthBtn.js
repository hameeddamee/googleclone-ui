import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toastr } from "react-redux-toastr";

import { isEmpty } from "../../../shared/helpers/validationHelpers";
import * as authAction from "../../../redux/actions/authActions";
import config from "../../../config";

const FBAuthBtn = ({ isLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMsg = useSelector((state) => state.auth.errorMsg);

  useEffect(() => {
    toastr.clean();
    if (!isEmpty(errorMsg)) {
      toastr.error("Facebook Login Error", errorMsg, {
        onHideComplete: () => dispatch(authAction.clearMessages()),
      });
    }
  }, [errorMsg]);

  const responseSuccess = async (response) => {
    if (response.status) {
      toastr.error(
        "Facebook Login Error",
        "An error occured using facebook login please try again "
      );
    } else {
      const {
        email,
        first_name,
        last_name,
        name,
        id,
        picture: {
          data: { url },
        },
      } = response;
      const userData = {
        formattedFirstName: first_name,
        formattedLastName: last_name,
        formattedfullNames: name,
        oauthId: id,
        email: email,
        oauthAvatar: url,
        oauthType: "facebook",
      };
      if (isLogin) {
        await dispatch(authAction.loginUserWithOauth(userData));
      } else {
        await dispatch(authAction.registerUserWithOauth(userData, history));
      }
    }
  };

  return (
    <FacebookLogin
      appId={config.Auth0.facebook.appId}
      fields="name,email,picture,first_name,last_name"
      scope="public_profile"
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          type="button"
          className="account__social-btn"
        >
          <span className={`fa fa-facebook`} />
        </button>
      )}
      callback={responseSuccess}
    />
  );
};

export default FBAuthBtn;
