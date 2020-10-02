import React from "react";
import successLogo from "../../assets/img/tick.svg";
import errorLogo from "../../assets/img/tick.svg";
import { Link } from "react-router-dom";

const AuthMessage = ({ title, message, isError, btnProps }) => {
  return (
    <div className="account account--photo">
      <div className="wrapper__user--select">
        <div className="account__wrapper">
          <div className="account__icon">
            <img src={isError ? errorLogo : successLogo} />
          </div>

          <h3 className="success__text text-center mb-5 mt-5">{title}</h3>
          <p>{message}</p>

          {btnProps && <Link to={btnProps.linkTo}>{btnProps.text}</Link>}
        </div>
      </div>
    </div>
  );
};

export default AuthMessage;
