import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import NotAuthenticated from '../NotAuthenticated/NotAuthenticated';
import Authenticated from '../Authenticated/Authenticated';

// Higher order component manages authenticated state
const Authenticator = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    let token = localStorage.getItem('token');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
      setIsAuthenticated(true);
    };
  }, []);

  // depending on authentication state we will display:
  const handleDisplay = (authBoolean: boolean) => {
    switch(authBoolean){
      case false:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
      case true:
        return <Authenticated setIsAuthenticated={setIsAuthenticated} />;
      default:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
    };
  };



  return(
    handleDisplay(isAuthenticated)
  );
};

export default Authenticator;