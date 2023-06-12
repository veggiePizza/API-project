import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [formSize, setFormSize] = useState("signUpForm");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [backendErrors, setbackendErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = [];
    if (firstName.length < 4) errors.push('First name is required.');
    if (!lastName.length) errors.push('Last name is required.');
    if (!email.length) errors.push('Email is required.');
    if (username.length < 4) errors.push('Valid username is required.');
    if (password.length < 6) errors.push('Valid password is required.');
    if (!confirmPassword.length) errors.push('Confirm password is required.');
    if (password != confirmPassword) errors.push('Confirm Password field must be the same as the Password field.');
    setValidationErrors(errors);
  }, [firstName, lastName, email, username, password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];

    dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
       .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setbackendErrors(data.errors)
          setFormSize("signUpForm2")
        }
      });
  };

  const hidePassword = (password) => {
    let str = ""
    for (let i = 0; i < password.length; i++)
      str += "*";
    return str;
  }

  return (
    <div className={formSize}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {backendErrors && (<>{Object.values(backendErrors).map(i => (
          <h2 className="errorMessages">{i}</h2>
        ))}</>)}

        <div className="formInput">
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            value={hidePassword(password)}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Confirm Password"
            value={hidePassword(confirmPassword)}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {!validationErrors.length ? (<button>Sign Up</button>) : (<button disabled >Sign Up</button>)}
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;