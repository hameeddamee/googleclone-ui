import React from "react";

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

const HamburgerBtn = ({
  changeMobileSidebarVisibility,
  changeSidebarVisibility
}) => {
  return (
    <div>
      <button
        type="button"
        className="topbar__button topbar__button--desktop"
        onClick={changeSidebarVisibility}
      >
        <img src={icon} alt="" className="topbar__button-icon" />
      </button>
      <button
        type="button"
        className="topbar__button topbar__button--mobile"
        onClick={changeMobileSidebarVisibility}
      >
        <img src={icon} alt="" className="topbar__button-icon" />
      </button>
    </div>
  );
};

export default HamburgerBtn;
