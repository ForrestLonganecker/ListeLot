import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './SignUp.css';

import authHelpers from '../../helpers/auth.js';

const signUpUrl = process.env.JWT_SECRET;

const SignUp = ({ setActiveView, setIsAuthenticated }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = () => {
    if(password !== passwordConfirmation){
      alert('Passwords does not match confirmation.');
    } else {
      let data = {
        email: email.toLowerCase().trim(),
        password: password.trim()
      };

      axios.post(signUpUrl, data)
      .then((res) => {
        let authenticated = authHelpers.authenticate(res.data);
        if(authenticated){
          setIsAuthenticated(true);
          alert('Thanks for signing up!');
        } else {
          alert(`Status code: ${res.statusCode}\nerror message: ${res.statusMessage}`);
        }
      })
      .catch((err) => {
        alert('error while sending request:\n', err);
      })
    };
  };


  return(
    <div className="sign-up-container">
      <h1>Sign up!</h1>
      <form className="sign-up-form" onSubmit={handleSignUp}>
        <input className="sign-up-input" type="text" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
        <input className="sign-up-input" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
        <input className="sign-up-input" type="password" placeholder="Confirm password" onChange={(e) => setPasswordConfirmation(e.target.value)} />

        <div className="button-container">
        <button className="main-button" type="submit">Sign up</button>
        <button className="secondary-button" type="button" onClick={() => setActiveView('log in')}>Log in?</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;