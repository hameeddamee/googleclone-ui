import React, { useState, Children } from "react";
import { Button, ButtonToolbar, Modal } from "reactstrap";
import classNames from "classnames";

const ModalComponent = (props) => {
  const { color, title, colored, header, showModal, toggle, children } = props;

  const modalClass = classNames({
    "modal-dialog--colored": colored,
    "modal-dialog--header": header,
  });

  return (
    <div>
      <Modal
        isOpen={showModal}
        toggle={toggle}
        modalClassName={`ltr-support`}
        className={`modal-dialog--${color} ${modalClass}`}
      >
        <div className="modal__header">
          <button
            className="lnr lnr-cross modal__close-btn"
            type="button"
            onClick={toggle}
          />
          <h4 className="text-modal  modal__title">{title}</h4>
        </div>
        <div className="modal__body">{children}</div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
