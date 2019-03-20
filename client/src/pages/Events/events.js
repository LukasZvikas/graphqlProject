import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import Modal from "../../components/Modal/modal";
import Backdrop from "../../components/Backdrop/backdrop";
import "./events.css";

const EventsPage = () => {
  const [creating, changeCreatingState] = useState(false);

  const [title, changeTitleState] = useState("");
  const [price, changePriceState] = useState("");
  const [date, changeDateState] = useState("");
  const [description, changeDescriptionState] = useState("");

  const context = useContext(AuthContext);

  const startEventCreation = () => {
    changeCreatingState(true);
  };

  const cancelEventCreation = () => {
    changeCreatingState(false);
  };

  const confirmHandler = async () => {
    cancelEventCreation();

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput : {title: "${title}", description: "${description}", price: ${price}, date: "${date}" }) {
            _id
            title
            description
            date
            price
          }
        }
      `
    };

    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.token}`
        }
      });

      console.log("RESSS", await res.json());
    } catch (error) {}
  };

  console.log("TITLE", title);
  return (
    <React.Fragment>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={cancelEventCreation}
          onConfirm={confirmHandler}
        >
          <form className="form">
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                onChange={e => changeTitleState(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                onChange={e => changePriceState(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                onChange={e => changeDateState(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="4"
                onChange={e => changeDescriptionState(e.target.value)}
              />
            </div>
          </form>
        </Modal>
      )}
      <div className="events-control">
        <p>Share your own Events!</p>
        <button className="btn" onClick={startEventCreation}>
          Create Event
        </button>
      </div>
    </React.Fragment>
  );
};

export default EventsPage;
