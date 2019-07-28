import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListItem.css';

let deleteItemUrl;
let completedItemUrl;
let updateItemUrl;
if(process.env.NODE_ENV === 'production'){
  deleteItemUrl = 'https://listelot.herokuapp.com/listItems/delete'
  completedItemUrl = 'https://listelot.herokuapp.com/listItems/completed'
  updateItemUrl = 'https://listelot.herokuapp.com/listItems/update'
}
if(process.env.NODE_ENV === 'development'){
  deleteItemUrl = 'http://localhost:4000/listItems/delete'; 
  completedItemUrl = 'http://localhost:4000/listItems/completed'; 
  updateItemUrl = 'http://localhost:4000/listItems/update'; 
}

const ListItem = ({ currentItem, setCurrentItems, currentItems }) => {

  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editText, setEditText] = useState('');

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
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if(editText.length < 1 || editText.length > 25){
      alert(`Adjust title length: ${editText.length}. Must be 1-25 characters`);
    } else if(editText !== currentItem.text){
      
      let data = {
        updatedText: editText,
        listItemId: currentItem.id,
        listId: currentItem.listId
      };

      axios.post(updateItemUrl, data)
      .then((res) => {

        let updatedItems = currentItems.map((item) => {
          if(item.id === currentItem.id){
            return res.data;
          } else {
            return item;
          };
        });

        setCurrentItems(updatedItems);
      })
      .catch((err) => {
        alert('something went wrong, please try agian');
      })
    }
  }
  
  const handleDisplay = (editingState) => {

    if(editingState){
      return(
        <div className="lists-item-container">
          <p className="lists-item-title">{currentItem.text}</p>
          <div className="lists-button-container">
            <button className="delete-lists-item-button" type="button" onClick={() => handleDelete()} >delete</button>
            <button className="lists-item-button" type="button" onClick={() => setCurrentlyEditing(!currentlyEditing)}>edit</button>
            <button className="complete-button" type="button" onClick={() => toggleComplete()} >{currentItem.isComplete ? "Completed!" : "unfinished"}</button>
          </div>
          <form className="editing-list-form" onSubmit={handleEdit}>
            <input className="edit-list-title-input" type="text" defaultValue={currentItem.text} onChange={(e) => setEditText(e.target.value)} />
            <button className="edit-list-button" type="submit">Submit</button>
          </form>
        </div>
      );
    } else {
      return(
        <div className="lists-item-container">
          <p className="lists-item-title">{currentItem.text}</p>
          <div className="lists-button-container">
            <button className="delete-lists-item-button" type="button" onClick={() => handleDelete()} >delete</button>
            <button className="lists-item-button" type="button" onClick={() => setCurrentlyEditing(!currentlyEditing)}>edit</button>
            <button className={currentItem.isComplete ? "complete-button" : "unfinished-button"} type="button" onClick={() => toggleComplete()} >{currentItem.isComplete ? "Completed!" : "unfinished"}</button>
          </div>
        </div>
      );
    }
  }

  return(
    handleDisplay(currentlyEditing)
  );
};

export default ListItem;