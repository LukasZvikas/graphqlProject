import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context";
import Modal from "../../components/Modal/modal";
import Backdrop from "../../components/Backdrop/backdrop";
import { Event } from "./event";
import "./events.css";

const EventsPage = () => {
  const [creating, changeCreatingState] = useState(false);
  const [title, changeTitleState] = useState("");
  const [price, changePriceState] = useState("");
  const [date, changeDateState] = useState("");
  const [description, changeDescriptionState] = useState("");
  const [events, changeEventsState] = useState([]);

  const context = useContext(AuthContext);

  const startEventCreation = () => {
    changeCreatingState(true);
  };

  const cancelEventCreation = () => {
    changeCreatingState(false);
  };

  const renderEvents = events => {
    return events.map((event, index) => {
      console.log("EVENT", event.createdBy._id);
      return (
        <Event
          index={index}
          title={event.title}
          description={event.description}
          date={event.date}
          price={event.price}
          userId={event.createdBy._id}
        />
      );
    });
  };

  const fetchEvents = async () => {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price,
            createdBy {
              _id
            }
          }
        }
      `
    };

    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseData = await res.json();
      console.log("RES", responseData);

      return changeEventsState(responseData.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
    //console.log("res", res)
  }, []);

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

  console.log("TITLE", events);
  return (
    <React.Fragment>
      <div className="events-control">
        <div className="events-control__panel">
        <h2>Share your own Events!</h2>
        <button className="btn" onClick={startEventCreation}>
          Create an event
        </button>
        </div>
        {renderEvents(events)}
      </div>
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
    </React.Fragment>
  );
};

export default EventsPage;
