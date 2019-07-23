import React from 'react';

import './Authenticated.css';

const Authenticated = ({ setIsAuthenticated }) => {

  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    alert('See you next time!');
  };

  return(
    <div className="authenticated-container">
      <h1>You are Authenticated and logged in</h1>
      <button className="secondary-button" type="button" onClick={() => handleLogOut()}>Log out</button>
    </div>
  );
};

export default Authenticated;