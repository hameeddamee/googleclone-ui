import React from "react";
import spinnerLogo from '../../assets/img/spinner.gif';

const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <div className="load__icon-wrap">
     <img src={spinnerLogo} className="load__icon" width="80px" height="80px"/>
      </div>
    </div>
  );
};

export default Spinner;
