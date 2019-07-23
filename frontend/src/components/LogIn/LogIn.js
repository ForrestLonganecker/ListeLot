import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './LogIn.css';

const logInUrl = 'http://localhost:4000/users/logIn';

const LogIn = ({ setActiveView, setIsAuthenticated }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = () => {
    let data = {
      email: email.toLowerCase().trim(),
      password: password.trim()
    };

    try {
      const res = axios.post(logInUrl, data);

      if(res.statusCode === 400){
        alert('Error when logging in: ' + res.statusMessage)
      } else {
        localStorage.setItem('token', res.data);
        setIsAuthenticated(true);
        alert('Welcome back!');
      };
    } catch(err) {
      alert('error: ' + err.message);
    };
  };

  return(
    <div className="log-in-container">
      <h1>Log in!</h1>
      <form className="log-in-form" onSubmit={handleLogIn}>
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