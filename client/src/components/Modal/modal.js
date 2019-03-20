import React from "react";

import "./modal.css";

const modal = props => (
  <div className="modal">
    <header className="modal__header">
      <h1>{props.title}</h1>
    </header>
    <section className="modal__content">{props.children}</section>
    <section className="modal__actions">
      {props.canCancel && (
        <div className="form-actions">
          <button className="btn" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      )}
      {props.canConfirm && (
        <div className="form-actions">
          <button className="btn" onClick={props.onConfirm}>
            Create Event
          </button>
        </div>
      )}
    </section>
  </div>
);

export default modal;
