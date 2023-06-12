import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [validationErrors, setValidationErrors] = useState([]);


  useEffect(() => {
    setErrors(false);
    const errors = [];

    if (credential.length < 4) errors.push('login is required');
    if (password.length < 6) errors.push('pass is required');
    setValidationErrors(errors);
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(false);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.message) setErrors("The provided credentials were invalid");
        }
      );
  };

  function demoUser() {
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
      .then(closeModal)
  }

  return (
    <div className="logInForm">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors && <h2 className="loginError">{errors}</h2>}

        <div className="loginForm">    
          <input
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {!validationErrors.length ? (<button className="loginButton" >Log In</button>) : (<button className="loginButton" disabled >Log In</button>)}
        <button className = "demoUser" onClick={demoUser} >Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;