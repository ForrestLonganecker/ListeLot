import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './SignUp.css';

// set up routes
let signUpUrl: string;
if(process.env.NODE_ENV === 'production'){
  signUpUrl = 'https://listelot.herokuapp.com/users/create'
}
if(process.env.NODE_ENV === 'development'){
  signUpUrl = 'http://localhost:4000/users/create'; 
}

const SignUp = ({ setActiveView, setIsAuthenticated }: {setActiveView: Function, setIsAuthenticated: Function}) => {
  
  // set up input field state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if passwords match
    if(password !== passwordConfirmation){
      alert('Passwords does not match confirmation.');
    } else {
      let data = {
        email: email.toLowerCase().trim(),
        password: password.trim()
      };

      // request signup
      axios.post(signUpUrl, data)
      .then((res) => {
        // res.data = token
        // set auth state add token to req.headers and set token in localStorage
        setIsAuthenticated(true);
        axios.defaults.headers.common = {'Authorization': `Bearer ${res.data}`};
        localStorage.setItem('token', res.data);
        alert('Thanks for signing up!');
      }) 
      .catch((err) => {
        alert('something went wrong, please try again');
      });
    };
  };


  return(
    <div className="sign-up-container">
      <h2>Sign up!</h2>
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