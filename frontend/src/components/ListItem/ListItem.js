import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListItem.css';

let deleteItemUrl;
let completedItemUrl;
if(process.env.NODE_ENV === 'production'){
  deleteItemUrl = 'https://listelot.herokuapp.com/listItems/delete'
  completedItemUrl = 'https://listelot.herokuapp.com/listItems/completed'
}
if(process.env.NODE_ENV === 'development'){
  deleteItemUrl = 'http://localhost:4000/listItems/delete'; 
  completedItemUrl = 'http://localhost:4000/listItems/completed'; 
}

const ListItem = ({ currentItem, setCurrentItems, currentItems }) => {

  const handleDelete = () => {

    let data = {
      listId: currentItem.listId,
      listItemId: currentItem.id
    };
    
    axios.post(deleteItemUrl, data)
    .then((res) => {

      // remove the deleted item from array
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
  };

  const toggleComplete = () => {

    let data = {
      completed: !currentItem.isComplete,
      listItemId: currentItem.id,
      listId: currentItem.listId
    };

    axios.post(completedItemUrl, data)
    .then((res) => {

      let updatedItems = currentItems.map((item) => {
        if(item.id === currentItem.id){
          currentItem.isComplete = !currentItem.isComplete;
          return currentItem;
        } else {
          return item;
        }
      })

      setCurrentItems(updatedItems);
    })
    .catch((err) => {
      alert('something went wrong, please refresh and try again');
    })
  }

  return(
    <div className="lists-item-container">
      <p className="lists-item-title">{currentItem.text}</p>
      <div className="lists-button-container">
        <button className="delete-lists-item-button" type="button" onClick={() => handleDelete()} >delete</button>
        <button className="lists-item-button" type="button" >edit</button>
        <button className="lists-item-button" type="button" onClick={() => toggleComplete()} >{currentItem.isComplete ? "Completed!" : "unfinished"}</button>
      </div>
    </div>
  );
};

export default ListItem;