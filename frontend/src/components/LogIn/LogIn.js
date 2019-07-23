import React from 'react';

import './LogIn.css';

const LogIn = ({ setActiveView }) => {

  return(
    <div>
      <h1>Log in!</h1>
      <button type="button" onClick={() => setActiveView('sign up')}>Sign up</button>
    </div>
  );
};

export default LogIn;