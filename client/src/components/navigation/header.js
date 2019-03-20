import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import AuthContext from "../../context/auth-context";

const Header = ({}) => {
  return (
    <AuthContext.Consumer>
      {({ token, logout }) => {
        console.log("TOKEN", token);
        return (
          <div className="navigation">
            <div className="navigation__logo">
              <h1>EasyEvent</h1>
            </div>
            <nav className="navigation__links">
              <ul>
                {!token && (
                  <li>
                    <NavLink to="/auth">Login</NavLink>
                  </li>
                )}
                {token && (
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
                {token && (
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Header;
