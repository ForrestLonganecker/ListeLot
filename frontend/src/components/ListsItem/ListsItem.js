import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListsItem.css';

let deleteListUrl;
let editListUrl;
if(process.env.NODE_ENV === 'production'){
  deleteListUrl = 'https://listelot.herokuapp.com/lists/delete'
  editListUrl = 'https://listelot.herokuapp.com/lists/update'
}
if(process.env.NODE_ENV === 'development'){
  deleteListUrl = 'http://localhost:4000/lists/delete'; 
  editListUrl = 'http://localhost:4000/lists/update'; 
}

const ListsItem = ({ list, setDeletedList, setEditingList }) => {

  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = (deleteId) => {

    let data = {
      listId: deleteId
    }

    axios.post(deleteListUrl, data)
    .then((res) => {
      setDeletedList(deleteId);
    })
    .catch((err) => {
      alert('something went wrong, please refresh or try again');
    }); 
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if(editTitle && editTitle !== list.title){
      let data = {
        updatedTitle: editTitle,
        listId: list.id
      };

      axios.post(editListUrl, data)
      .then((res) => {
        setEditingList(res.data);
      })
      .catch((err) => {
        alert('Could not update list, please try again.');
      });
    };
  };

  const handleDisplay = (editingState) => {

    if(editingState === true){
      return(
        <div className="lists-item-container">
          <p className="lists-item-title">{list.title}</p>
          <div className="lists-button-container">
            <button className="delete-lists-item-button" type="button" onClick={() => handleDelete(list.id)}>delete</button>
            <button className="lists-item-button" type="button" onClick={() => setCurrentlyEditing(!currentlyEditing)}>edit</button>
            <button className="lists-item-button" type="button">select</button>
          </div>
          <form className="editing-list-form" onSubmit={handleEdit}>
            <input className="edit-list-title-input" type="text" defaultValue={list.title} onChange={(e) => setEditTitle(e.target.value)} />
            <button className="edit-list-button" type="submit">Submit</button>
          </form>
        </div>
      );
    } else {
      return(
        <div className="lists-item-container">
          <p className="lists-item-title">{list.title}</p>
          <div className="lists-button-container">
            <button className="delete-lists-item-button" type="button" onClick={() => handleDelete(list.id)}>delete</button>
            <button className="lists-item-button" type="button" onClick={() => setCurrentlyEditing(!currentlyEditing)}>edit</button>
            <button className="lists-item-button" type="button">select</button>
          </div>
        </div>
      );
    };
  };

  return(
    handleDisplay(currentlyEditing)
  );
};

export default  ListsItem;