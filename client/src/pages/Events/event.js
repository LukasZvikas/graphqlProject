import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";

export const Event = ({ index, title, price, description, date, userId }) => {
  const [showDetails, changeShowDetailsState] = useState(false);
  const context = useContext(AuthContext);

  const toggleShowDetailsState = () => {
    changeShowDetailsState(!showDetails);
  };
  return (
    <div className="event-item" key={index}>
      <div className="event-item__details">
        <div className="event-item__detail">Title: {title}</div>
        <div className="event-item__detail">Price: {price}</div>
        {showDetails ? (
          <React.Fragment>
            <div className="event-item__detail">Description: {description}</div>
            <div className="event-item__detail">
              Event date: {date.slice(0, 10)}
            </div>
          </React.Fragment>
        ) : null}
      </div>
      <div>
        <div />
        <button type="button" onClick={() => toggleShowDetailsState()}>
          View more details
        </button>

        {userId === context.userId ? <div>You created this event</div> : null}
      </div>
    </div>
  );
};
