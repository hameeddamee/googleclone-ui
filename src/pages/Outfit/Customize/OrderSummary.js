import React from "react";

const OrderModal = (props) => {
  return (
  
      <div id="order-container">
        <div id="order-img-div">
          <div id="img-div"><img src={props.imageSrc} id="order-image"/></div>
        </div>
        <div id="subscription-options">
          <div className="sub-option-container">
            <h3 className="sub-option-header">Subscribe & Save</h3>
            <p className="order-para">1 outfit every week</p>
          </div>
          <div className="sub-option-container">
            <h3 className="sub-option-header">Just one outfit</h3>
            <p className="order-para">One time purchase</p>
          </div>
          <div>
            <button id="submit-btn" >
              Complete Order
            </button>
          </div>
        </div>
      </div>
  
  );
};

export default OrderModal;
