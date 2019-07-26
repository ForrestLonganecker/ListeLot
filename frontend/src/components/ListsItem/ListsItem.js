import React from 'react';

import './ListsItem.css';

const ListsItem = ({list}) => {

  return(
    <div className="lists-item-container">
      <p className="lists-item-title">{list.title}</p>
      <button type="button">edit</button>
      <button type="button">delete</button>
      <button type="button">select</button>
    </div>
  );
};

export default  ListsItem;