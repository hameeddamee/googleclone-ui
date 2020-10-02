import React from "react";

const StandAloneView = ({ children }) => {
  return (
    <div className="account">
      <div className="account__wrapper">{children}</div>
    </div>
  );
};

export default StandAloneView;
