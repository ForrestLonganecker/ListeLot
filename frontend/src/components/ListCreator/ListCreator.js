import React from 'react'

import './ListCreator.css';

const ListCreator = () => {

  return(
    <form className="list-creator-form">
      <label>Create new list</label>
      <input type="text" placeholder="Input list title"/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ListCreator;