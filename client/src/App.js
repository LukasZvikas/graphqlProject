import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/navigation/header";
import Login from "../src/pages/Auth/login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="main-content">
          <Switch>
            <Route path="/" component={null} exact />
            <Route path="/auth" component={Login} />
            <Route path="/events" component={null} />
            <Route path="/bookings" component={null} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
