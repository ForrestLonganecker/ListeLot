import React from 'react';
import { useState } from 'react';

import './LogIn.css';

const LogIn = ({ setActiveView }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return(
    <div className="log-in-container">
      <h1>Log in!</h1>
      <form className="log-in-form">
        <input className="log-in-input" type="text" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
        <input className="log-in-input" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

        <div className="button-container">
        <button className="main-button" type="submit">Log in</button>
        <button className="secondary-button" type="button" onClick={() => setActiveView('sign up')}>Sign up?</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;