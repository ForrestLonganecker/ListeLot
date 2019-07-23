import React from 'react';
import { useState } from 'react';



import './NotAuthenticated.css';

import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';

const NotAuthenticated = () => {

  const [activeView, setActiveView] = useState('');

  const handleDisplay = (view) => {
    switch(view){
      case 'log in':
        return <LogIn setActiveView={setActiveView} />;
      case 'sign up':
        return <SignUp setActiveView={setActiveView} />;
      default:
        return <LogIn setActiveView={setActiveView} />;
    };
  };

  return(
      handleDisplay(activeView)
  );
};

export default NotAuthenticated;