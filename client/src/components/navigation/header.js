import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = ({}) => {
  return (
    <div className="navigation">
      <div className="navigation__logo">
        <h1>EasyEvent</h1>
      </div>
      <nav className="navigation__links">
        <ul>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
