import React from 'react';
import axios from 'axios';

import './Banner.css';

const Banner = ({ setIsAuthenticated }) => {

  const handleLogOut = () => {
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    alert('See you next time!');
  };

  return(
    <div className="banner-container">
      <h1 className="site-title">ListeLot</h1>
      <button className="logout-button" type="button" onClick={() => handleLogOut()}>Log out</button>
    </div>
  );
};


export default Banner;