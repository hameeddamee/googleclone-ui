import React from "react";
import errorImg from "../../../shared/assets/img/errorImage.png";

const ModalError = (props) => {
  return (
    <>
      <div id="error-container">
        <span id="error-header">
          <h2>Oops!</h2>
        </span>
        <span id="error-paragraph">
          <p>Please complete the information required to place your order</p>
        </span>
        <span id="error-img-span">
          <img src={errorImg} id="error-img" />
        </span>
      </div>
      <div id="ok-link" onClick={props.toggle}>
        Ok{" "}
      </div>
    </>
  );
};

export default ModalError;
