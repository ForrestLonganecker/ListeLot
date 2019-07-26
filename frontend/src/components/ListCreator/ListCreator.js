import React from 'react'

import './ListCreator.css';

const ListCreator = () => {

  return(
    <form className="list-creator-form">
      <label className="create-list-label">Create new list</label>
      <input className="create-list-input" type="text" placeholder="Input list title"/>
      <button className="create-list-button" type="submit">Submit</button>
    </form>
  );
};

export default ListCreator;