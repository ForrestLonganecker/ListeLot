import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './LogIn.css';

// set up routes
let logInUrl: string;
if(process.env.NODE_ENV === 'production'){
  logInUrl = 'https://listelot.herokuapp.com/users/logIn'
}
if(process.env.NODE_ENV === 'development'){
  logInUrl = 'http://localhost:4000/users/logIn'; 
}

interface Props {
  setActiveView: Function,
  setIsAuthenticated: Function
}

// pass in setActiveView to toggle between signup/login
// setIsAuthenticated to toggle view change
const LogIn = ({ setActiveView, setIsAuthenticated }: Props) => {

  // set up input field state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = (e: React.FormEvent<HTMLFormElement> ) => {
    // prevent page refresh
    e.preventDefault();

    let data = {
      email: email.toLowerCase().trim(),
      password: password.trim()
    };

    axios.post(logInUrl, data)
    .then((res) => {
      // res.data = token
      // set auth state, place token in req.headers and local storage 
      axios.defaults.headers.common = {'Authorization': `Bearer ${res.data}`};
      localStorage.setItem('token', res.data);
      setIsAuthenticated(true);
      alert('Welcome back!');
    })
    .catch((err) => {
      alert('error when logging in, please try again');
    });
  };

  return(
    <div className="log-in-container">
      <h2>Log in!</h2>
      <form className="log-in-form" onSubmit={handleLogIn}>
        <input className="log-in-input" type="text" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
        <input className="log-in-input" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

        <div className="button-container">
        <button className="main-button" type="submit">Log in</button>
        <button className="sign-up-button" type="button" onClick={() => setActiveView('sign up')}>Sign up?</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;