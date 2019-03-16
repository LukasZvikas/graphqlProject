import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <form>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="form-actions">
          <button type="button">Sign up</button>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default Login;
