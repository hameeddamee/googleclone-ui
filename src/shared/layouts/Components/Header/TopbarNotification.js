/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import NotificationsIcon from "mdi-react/NotificationsIcon";

const notifications = [
  {
    ava: `${process.env.PUBLIC_URL}/img/topbar/ava.png`,
    name: "Exhibition",
    message: "An exhibition as been created",
    date: "09:02",
  },
  {
    ava: `${process.env.PUBLIC_URL}/img/topbar/ava2.png`,
    name: "Artwork",
    message: "An artwork as been created",
    date: "09:00",
  },
];

const TopbarNotification = () => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="topbar__collapse">
      <button className="topbar__btn" type="button" onClick={toggle}>
        <NotificationsIcon />
      </button>
      {collapse && (
        <button className="topbar__back" type="button" onClick={toggle} />
      )}
      <Collapse isOpen={collapse} className="topbar__collapse-content">
        <div className="topbar__collapse-title-wrap">
          <p className="topbar__collapse-title">Notifications</p>
          <button className="topbar__collapse-button" type="button">
            Mark all as read
          </button>
        </div>
        {notifications.map((notification, index) => (
          <div className="topbar__collapse-item" key={index}>
            <div className="topbar__collapse-img-wrap">
              <img
                className="topbar__collapse-img"
                src={notification.ava}
                alt=""
              />
            </div>
            <p className="topbar__collapse-message">
              <span className="topbar__collapse-name">{notification.name}</span>
              {notification.message}
            </p>
            <p className="topbar__collapse-date">{notification.date}</p>
          </div>
        ))}
        <p className="topbar__collapse-link" onClick={toggle}>
          Clear All Notification
        </p>
        <Link
          className="topbar__collapse-link"
          to="/dashboard_default"
          onClick={toggle}
        >
          See all notifications
        </Link>
      </Collapse>
    </div>
  );
};

export default TopbarNotification;
