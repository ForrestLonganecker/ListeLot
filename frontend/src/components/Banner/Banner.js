import React from 'react';

import './Banner.css';

const Banner = ({ setIsAuthenticated }) => {

  const handleLogOut = () => {
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