import React from "react";


export const Sidebar = ({ children }) => {
  return (
    <div className="side-bar">
      <>
        <div>{children}</div>
      </>
    </div>
  );
};

export default Sidebar;
