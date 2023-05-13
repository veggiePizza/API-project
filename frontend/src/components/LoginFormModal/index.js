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
        {errors && <h2>{errors}</h2>}
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {!validationErrors.length ? (<button type="submit" >Log In</button>) : (<button type="submit" disabled >Log In</button>)}
        <button onClick={demoUser} >Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;