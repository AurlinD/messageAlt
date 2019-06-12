import React from "react";
import ReactDOM from "react-dom";
import history from "../history";

const Modal = props => {
  // specific function for modal
  // creatportal used when you want to render something
  // not created by your html or by your react applciation
  // onClick triggers function when clicked upon
  // e.stopPropgation stops the propagation up the tree
  return ReactDOM.createPortal(
    <div
      onClick={() => history.push("/")}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    // call other div ID created speicfically for modal and NOT root which it would default to
    document.querySelector("#modal")
  );
};

export default Modal;
