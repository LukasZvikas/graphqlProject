import React, { Component } from "react";
import "./Auth.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, loginMode: true };
    this.userNameEl = React.createRef();
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  changeAuthMode() {
    this.setState({ loginMode: !this.state.loginMode });
  }

  async onFormSubmit(e) {
    e.preventDefault();

    const userName = this.userNameEl.current.value;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    // if (email.trim().length === 0 || password.trim().length === 0) return;

    console.log(email, password);

    let requestBody;

    requestBody = {
      query: `
            query {
                loginUser(userName: "${userName}", password: "${password}"){
                    userId
                    token
                }
            }
        `
    };

    if (!this.state.loginMode) {
      requestBody = {
        query: `
                  mutation {
                      createUser(userInput: {userName: "${userName}", password: "${password}", email: "${email}"}){
                          _id
                          email
                      }
                  }
              `
      };
    }

    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response.status);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Request failed");
      }

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.onFormSubmit.bind(this)}>
        <div className="form-control">
          <label htmlFor="text">Username</label>
          <input type="text" id="text" ref={this.userNameEl} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="button" onClick={this.changeAuthMode.bind(this)}>
            Change to {this.state.loginMode ? "Login" : "Sign up"}
          </button>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default Login;
