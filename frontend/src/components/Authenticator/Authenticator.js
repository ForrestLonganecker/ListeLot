import React from 'react';
import { useState } from 'react';

import NotAuthenticated from '../NotAuthenticated/NotAuthenticated';

const Authenticator = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleDisplay = (authBoolean) => {
    switch(authBoolean){
      case false:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
      case true:
        return <div>authenticated</div>;
      default:
        return <NotAuthenticated setIsAuthenticated={setIsAuthenticated} />;
    }
  }


  return(
    handleDisplay(isAuthenticated)
  );
};

export default Authenticator;