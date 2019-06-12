import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  // specific function for modal
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active">
      <div className="ui standard modal visible active">Are you sure?</div>
    </div>,
    // call other div ID created and NOT root which it would default to
    document.querySelector("#modal")
  );
};

export default Modal;
