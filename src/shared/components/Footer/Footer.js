import React from "react";


export const Footer = ({ width, height, children }) => {
  return (
    <div style={{ width: width, minHeight: height }}>
      
      <div id="footer-section">
      {children}
      </div>
      
    </div>
  );
};

export default Footer;
