import React from 'react';

import './ListsItem.css';

const ListsItem = ({list}) => {

  return(
    <div className="lists-item-container">
      <p className="lists-item-title">{list.title}</p>
      <div className="lists-button-container">
        <button className="delete-lists-item-button" type="button">delete</button>
        <button className="lists-item-button" type="button">edit</button>
        <button className="lists-item-button" type="button">select</button>
      </div>
    </div>
  );
};

export default  ListsItem;