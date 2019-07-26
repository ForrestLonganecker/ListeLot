import React from 'react';

import './Authenticated.css';

import Banner from '../Banner/Banner';

const Authenticated = ({ setIsAuthenticated }) => {

  return(
    <div className="authenticated-container">
      <Banner setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
};

export default Authenticated;