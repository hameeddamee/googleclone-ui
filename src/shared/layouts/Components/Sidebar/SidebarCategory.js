import React, { useState } from "react";
import { Collapse } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";

const SidebarCategory = ({ id, title, icon, isNew, children }) => {
  const [collapse, setCollapse] = useState(false);

  const categoryClass = classNames({
    "sidebar__category-wrap": true,
    "sidebar__category-wrap--open": collapse
  });

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={categoryClass} id={id}>
      <button
        type="button"
        className="sidebar__link sidebar__category"
        onClick={toggle}
      >
        {icon ? <span className={`sidebar__link-icon fas fa-${icon}`} /> : ""}
        <p className="sidebar__link-title">
          {title}
          {isNew && <span className="sidebar__category-new" />}
        </p>
        <span className="sidebar__category-icon lnr lnr-chevron-right" />
      </button>
      <Collapse isOpen={collapse} className="sidebar__submenu-wrap">
        <ul className="sidebar__submenu">
          <div>{children}</div>
        </ul>
      </Collapse>
    </div>
  );
};

SidebarCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isNew: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

SidebarCategory.defaultProps = {
  icon: "",
  isNew: false
};

export default SidebarCategory;
