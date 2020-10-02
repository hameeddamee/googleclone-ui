import React from "react";
import { connect } from "react-redux";
import Scrollbar from "react-smooth-scrollbar";
import SidebarContent from "./SidebarContent";
import classNames from "classnames";
import { setCurrentUser } from "../../../../redux/actions/authActions";

const Sidebar = ({
  changeToDark,
  changeToLight,
  currentUser,
  changeMobileSidebarVisibility,
  sidebar,
}) => {
  const sidebarClass = classNames({
    sidebar: true,
    "sidebar--show": sidebar.show,
    "sidebar--collapse": sidebar.collapse,
  });
  return (
    <div className={sidebarClass}>
      <button
        type="button"
        className="sidebar__back"
        onClick={changeMobileSidebarVisibility}
      />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent
            onClick={() => {}}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            currentUser={currentUser}
          />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            currentUser={currentUser}
          />
        </div>
      </Scrollbar>

      <a
        href=""
        className="sidebar__help"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i id="help-link" className="fas fa-question-circle fa-2x"></i>{" "}
      </a>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  setCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
