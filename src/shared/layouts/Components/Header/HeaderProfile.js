import React, { useState } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
// import profileImage from "../../../assets/img/profile-avatar.png";
import isEmpty from "../../../helpers/validationHelpers";

const HeaderProfile = ({ onClickHandler, currentUser }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar" onClick={toggle}>
        {!isEmpty(currentUser.avatar) ? (
          <img
            src={currentUser.avatar}
            className="topbar__avatar-img"
            alt="avatar"
          />
        ) : (
          <img src={""} className="topbar__avatar-img" alt="avatar" />
        )}

        <div className="topbar__avatar-name">
          {currentUser.firstName} {currentUser.lastName}
        </div>
        <DownIcon className="topbar__icon" />
      </button>
      {collapse && (
        <button type="button" className="topbar__back" onClick={toggle} />
      )}
      <Collapse isOpen={collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink title="Profile" icon="user" path="/profile" />
          <div className="topbar__menu-divider" />
          <div onClick={onClickHandler}>
            <TopbarMenuLink
              title="Log Out"
              onClick={onClickHandler}
              icon="exit"
              path="/"
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default HeaderProfile;
