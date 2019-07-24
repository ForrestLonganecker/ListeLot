import React from 'react';
import { useState } from 'react';

import './NotAuthenticated.css';

import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';

const NotAuthenticated = ({ setIsAuthenticated }) => {

  const [activeView, setActiveView] = useState('');

  const handleDisplay = (view) => {
    console.log(process.env.NODE_ENV);
    switch(view){
      case 'log in':
        return <LogIn setActiveView={setActiveView} setIsAuthenticated={setIsAuthenticated} />;
      case 'sign up':
        return <SignUp setActiveView={setActiveView} setIsAuthenticated={setIsAuthenticated} />;
      default:
        return <LogIn setActiveView={setActiveView} setIsAuthenticated={setIsAuthenticated} />;
    };
  };

  return(
      handleDisplay(activeView)
  );
};

export default NotAuthenticated;