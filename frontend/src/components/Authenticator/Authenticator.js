import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import NotAuthenticated from '../NotAuthenticated/NotAuthenticated';
import Authenticated from '../Authenticated/Authenticated';

const Authenticator = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      let token = localStorage.getItem('token');
      if(token){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        setIsAuthenticated(true);
      };
    }, []);

  const handleDisplay = (authBoolean) => {
    switch(authBoolean){
      case false:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
      case true:
        return <Authenticated isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />;
      default:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
    };
  };



  return(
    handleDisplay(isAuthenticated)
  );
};

export default Authenticator;