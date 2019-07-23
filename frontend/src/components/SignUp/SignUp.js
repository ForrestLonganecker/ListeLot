import React from 'react';

import './SignUp.css';

const SignUp = ({ setActiveView }) => {

  return(
    <div>
      <h1>Sign up!</h1>
      <button type="button" onClick={() => setActiveView('log in')}>Log in</button>
    </div>
  );
};

export default SignUp;