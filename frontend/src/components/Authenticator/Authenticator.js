import React from 'react';
import { useState } from 'react';

import NotAuthenticated from '../NotAuthenticated/NotAuthenticated';
import Authenticated from '../Authenticated/Authenticated';

const Authenticator = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleDisplay = (authBoolean) => {
    switch(authBoolean){
      case false:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
      case true:
        return <Authenticated isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />;
      default:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
    }
  }


  return(
    handleDisplay(isAuthenticated)
  );
};

export default Authenticator;