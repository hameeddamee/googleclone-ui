import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  logoutUser,
  setCurrentUser,
} from "../../../../redux/actions/authActions";

import HambugerBtn from "./HamburgerBtn";
import HeaderProfile from "./HeaderProfile";
import TopbarNotification from "./TopbarNotification";

const Header = ({
  user,
  isAuthenticated,
  currentUser,
  logoutUser,
  changeMobileSidebarVisibility,
  changeSidebarVisibility,
}) => {
  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <HambugerBtn
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
            changeSidebarVisibility={changeSidebarVisibility}
          />
          <Link className="topbar__logo" to="/dashboard_default" />
        </div>

        <div className="topbar__right">
          <TopbarNotification />
          <HeaderProfile
            onClickHandler={logoutUser}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  logoutUser,
  setCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
