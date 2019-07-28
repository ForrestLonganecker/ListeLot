import React from 'react';

import './ListItem.css';

const ListItem = ({ listId, text, isComplete }) => {

  return(
    <div className="lists-item-container">
      <p className="lists-item-title">{text}</p>
      <div className="lists-button-container">
        <button className="delete-lists-item-button" type="button" >delete</button>
        <button className="lists-item-button" type="button" >edit</button>
        <button className="lists-item-button" type="button" >{isComplete ? "Completed!" : "unfinished"}</button>
      </div>
    </div>
  );
};

export default ListItem;