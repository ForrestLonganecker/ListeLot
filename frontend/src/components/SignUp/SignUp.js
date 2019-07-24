import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './SignUp.css';

let signUpUrl;
if(process.env.NODE_ENV === 'production'){
  signUpUrl = 'https://listelot.herokuapp.com/users/create'
}
if(process.env.NODE_ENV === 'development'){
  signUpUrl = 'http://localhost:4000/users/create'; 
}

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

      try {
        const res = axios.post(signUpUrl, data); 
          if(res.statusCode === 400){
            alert(`Status code: ${res.statusCode}\nerror message: ${res.statusMessage}`);
          } else {
            setIsAuthenticated(true);
            localStorage.setItem('token', res.data);
            alert('Thanks for signing up!');
          }
      } catch(err) {
        alert('error while sending request:\n' + err.message);
      };
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