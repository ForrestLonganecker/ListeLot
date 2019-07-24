import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './LogIn.css';

let logInUrl;
if(process.env.NODE_ENV === 'production'){
  logInUrl = 'https://listelot.herokuapp.com/users/logIn'
}
if(process.env.NODE_ENV === 'development'){
  logInUrl = 'http://localhost:4000/users/logIn'; 
}

const LogIn = ({ setActiveView, setIsAuthenticated }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (e) => {
    e.preventDefault();

    let data = {
      email: email.toLowerCase().trim(),
      password: password.trim()
    };

    try {
      const res = await axios.post(logInUrl, data);
      if(res.status === 200){
        localStorage.setItem('token', res.data);
        setIsAuthenticated(true);
        alert('Welcome back!');
      } else {
        alert('Error when logging in: ' + res.statusText)
      };
    } catch(err) {
      alert('error while sending request:\n' + err.message);
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