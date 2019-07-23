import React from 'react';
import { useState } from 'react';

import './SignUp.css';

const SignUp = ({ setActiveView }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');



  return(
    <div className="sign-up-container">
      <h1>Sign up!</h1>
      <form className="sign-up-form">
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