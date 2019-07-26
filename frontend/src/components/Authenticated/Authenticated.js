import React from 'react';

import './Authenticated.css';

import Banner from '../Banner/Banner';
import Lists from '../Lists/Lists';

const Authenticated = ({ setIsAuthenticated }) => {

  return(
    <div className="authenticated-container">
      <Banner setIsAuthenticated={setIsAuthenticated} />
      <Lists />
    </div>
  );
};

export default Authenticated;