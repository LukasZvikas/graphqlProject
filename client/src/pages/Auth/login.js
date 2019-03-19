import React, { useContext, useState, useRef } from "react";
import AuthContext from "../../context/auth-context";
import "./Auth.css";

const Login = () => {
  const userNameEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();

  const context = useContext(AuthContext);

  const [loginMode, changeLoginMode] = useState(true);

  function changeAuthMode() {
    changeLoginMode(!loginMode);
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    console.log("user", userNameEl);
    const userName = userNameEl.current.value;
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (
      userName.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    )
      return;

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

    if (!loginMode) {
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
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Request failed");
      }

      const resData = await response.json();

      console.log(resData.data);

      const token = resData.data.loginUser.token;
      const userId = resData.data.loginUser.userId;

      context.login(token, userId);
      console.log("context", context);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="form" onSubmit={e => onFormSubmit(e)}>
      <div className="form-control">
        <label htmlFor="text">Username</label>
        <input type="text" id="text" ref={userNameEl} />
      </div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-actions">
        <button type="button" onClick={() => changeAuthMode()}>
          Change to {loginMode ? "Login" : "Sign up"}
        </button>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
