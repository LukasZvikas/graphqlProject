import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/navigation/header";
import Login from "../src/pages/Auth/login";
import EventsPage from "../src/pages/Events"
import AuthContext from "../src/context/auth-context";

import "./App.css";

// const client = new ApolloClient({
//   uri: "http://localhost:5000/graphql"
// });

const App = () => {
  const [isLoggedIn, changeLoggedInState] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <Header />
        <div className="main-content">
          <Switch>
            <Route path="/" component={null} exact />
            <Route path="/auth" component={Login} />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={null} />
          </Switch>
        </div>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default App;
