import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const { closeModal } = useModal();


  useEffect(() => {
    setErrors(false);
    const errors = [];
    if (firstName.length < 4) errors.push('first name is required');
    if (!lastName.length) errors.push('last name is required');
    if (!email.length) errors.push('email is required');
    if (username.length < 4) errors.push('valid username is required');
    if (password.length < 6) errors.push('valid password is required');
    if (!confirmPassword.length) errors.push('confirm password is required');
    if (password != confirmPassword) errors.push('Confirm Password field must be the same as the Password field');
    setValidationErrors(errors);
  }, [firstName, lastName, email, username, password, confirmPassword])

  const handleSubmit = (e) => {
    setErrors(false);
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);

  };

console.log(errors)
  return (
    <div className="logInForm">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        
        <label>
          First Name
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {!validationErrors.length ? (<button type="submit" >Sign Up</button>) : (<button type="submit" disabled >Sign Up</button>)}
      </form>
    </div>
  );
}

export default SignupFormModal;