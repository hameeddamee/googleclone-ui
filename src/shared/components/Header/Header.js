import React from "react";

import "./Header.css";

export const Footer = ({ width, height, OutfitName, title, children }) => {
  return (
    <div className="side-bar" style={{ width: width, minHeight: height }}>
      <>
        <div>{children}</div>
      </>
    </div>
  );
};

export default Footer;
