import React from 'react';
import { useState } from 'react';

import './NotAuthenticated.css';

import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import NotAuthenticatedBanner from '../NotAuthenticatedBanner/NotAuthenticatedBanner';

const NotAuthenticated = ({ setIsAuthenticated }: {setIsAuthenticated: Function}) => {

  const [activeView, setActiveView] = useState('');

  // sets display based on view state
  const handleDisplay = (view: string) => {
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
      <div className="not-auth-container">
        <NotAuthenticatedBanner />
        {handleDisplay(activeView)}
      </div>
  );
};

export default NotAuthenticated;