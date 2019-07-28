import React from 'react';

import './ListItemCreator.css';

const ListItemCreator = ({ listTitle, listId }) => {

  return(
    <form  className="list-creator-form">
      <label className="create-list-label">{listTitle}</label>
      <input className="create-list-input" type="text" placeholder="add a new item to your list" />
      <button className="create-list-button" type="submit">Submit</button>
    </form>
  );
};

export default ListItemCreator;