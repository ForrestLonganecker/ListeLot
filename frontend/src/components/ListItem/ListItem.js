import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListItem.css';

let deleteItemUrl;
if(process.env.NODE_ENV === 'production'){
  deleteItemUrl = 'https://listelot.herokuapp.com/listItems/delete'
}
if(process.env.NODE_ENV === 'development'){
  deleteItemUrl = 'http://localhost:4000/listItems/delete'; 
}

const ListItem = ({ currentItem, setCurrentItems, currentItems }) => {

  const handleDelete = () => {

    let data = {
      listId: currentItem.listId,
      listItemId: currentItem.id
    };
    
    axios.post(deleteItemUrl, data)
    .then((res) => {

      let updatedItems = currentItems.filter((item) => {
        if(item.id !== currentItem.id){
          return item
        };
      });

      setCurrentItems(updatedItems)
    })
    .catch((err) => {
      alert('error when deleting, please refresh and try again');
    });
  }

  return(
    <div className="lists-item-container">
      <p className="lists-item-title">{currentItem.text}</p>
      <div className="lists-button-container">
        <button className="delete-lists-item-button" type="button" onClick={() => handleDelete()} >delete</button>
        <button className="lists-item-button" type="button" >edit</button>
        <button className="lists-item-button" type="button" >{currentItem.isComplete ? "Completed!" : "unfinished"}</button>
      </div>
    </div>
  );
};

export default ListItem;