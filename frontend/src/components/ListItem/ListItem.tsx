import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListItem.css';

// set up routes
let deleteItemUrl: string;
let completedItemUrl: string;
let updateItemUrl: string;
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

interface Props {
  currentItem: Item,
  setCurrentItems: Function,
  currentItems: Array<Item>
}

interface Item {
  listId: number,
  id: number,
  isComplete: boolean,
  text: string
}

const ListItem = ({ currentItem, setCurrentItems, currentItems }: Props) => {

  // set up state for toggling edit view state and edited text
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editText, setEditText] = useState('');

  const handleDelete = () => {

    let data = {
      listId: currentItem.listId,
      listItemId: currentItem.id
    };
    
    axios.post(deleteItemUrl, data)
    .then((res) => {
      // res is succes code 200

      // remove the deleted item from array
      let updatedItems = currentItems.filter((item) => {
        if(item.id !== currentItem.id){
          return item
        } else {
          return null;
        };
      });

      // set current items to the updated items array
      setCurrentItems(updatedItems)
    })
    .catch((err) => {
      alert('error when deleting, please refresh and try again');
    });
  };

  // set item to complete, or unfinished based on starting state
  const toggleComplete = () => {

    let data = {
      completed: !currentItem.isComplete,
      listItemId: currentItem.id,
      listId: currentItem.listId
    };

    axios.post(completedItemUrl, data)
    .then((res) => {
      // res is success code 200
      
      let updatedItems = currentItems.map((item) => {
        if(item.id === currentItem.id){
          currentItem.isComplete = !currentItem.isComplete;
          return currentItem;
        } else {
          return item;
        }
      })

      // set current items to updated item array
      setCurrentItems(updatedItems);
    })
    .catch((err) => {
      alert('something went wrong, please refresh and try again');
    });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    e.preventDefault();

    // verify input length
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
        // res.data = updated item

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
    };
  }
  
  // handle display depending on editing state
  const handleDisplay = (editingState: boolean) => {

    // display with edit input or without depending on state(currentlyEditing)
    if(editingState){
      return(
        <div className="lists-item-container">
          <p className="lists-item-title">{currentItem.text}</p>
          <div className="lists-button-container">
            <button className="delete-lists-item-button" type="button" onClick={() => handleDelete()} >delete</button>
            <button className="lists-item-button" type="button" onClick={() => setCurrentlyEditing(!currentlyEditing)}>edit</button>
            <button className={currentItem.isComplete ? "complete-button" : "unfinished-button"} type="button" onClick={() => toggleComplete()} >{currentItem.isComplete ? "Completed!" : "unfinished"}</button>
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
    // pass in currentlyEditing
    handleDisplay(currentlyEditing)
  );
};

export default ListItem;