import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListsItem.css';

// set up routes
let deleteListUrl: string;
let editListUrl: string;
if(process.env.NODE_ENV === 'production'){
  deleteListUrl = 'https://listelot.herokuapp.com/lists/delete'
  editListUrl = 'https://listelot.herokuapp.com/lists/update'
}
if(process.env.NODE_ENV === 'development'){
  deleteListUrl = 'http://localhost:4000/lists/delete'; 
  editListUrl = 'http://localhost:4000/lists/update'; 
}

interface Props {
  list: List,
  lists: Array<List>,
  setLists: Function,
  selectList: Function
}

interface List {
  id: number,
  title?: string
}

// take in list, the ability to modify the list of lists and select active list
const ListsItem = ({ list, lists, setLists, selectList }: Props) => {

  // currently editing state used for changing view, and edit title used for update
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = () => {

    let data = {
      listId: list.id
    }

    axios.post(deleteListUrl, data)
    .then((res) => {
      // res = success code 200

      // filter out deleted list
      let updatedLists = lists.filter((originalList) => {
        if(originalList.id !== list.id){
          return originalList;
        } else {
          return null;
        }
      });

      // set state for list of lists
      setLists(updatedLists);
    })
    .catch((err) => {
      alert('something went wrong, please refresh or try again');
    }); 
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    e.preventDefault();

    // check input length/ value
    if(editTitle.length > 25 || editTitle.length < 1){
      alert(`Adjust title length: ${editTitle.length}. Must be 1-25 characters`);
    } else {
      if(editTitle && editTitle !== list.title){
        let data = {
          updatedTitle: editTitle,
          listId: list.id
        };
  
        axios.post(editListUrl, data)
        .then((res) => {
          // res.data = updatedlist

          // replace the list that has been updated
          let updatedLists = lists.map((originalList) => {
            if(originalList.id === list.id){
              return res.data;
            } else {
              return originalList;
            };
          });
  
          // set the list of list state to updatedLists
          setLists(updatedLists);
        })
        .catch((err) => {
          alert('Could not update list, please try again.');
        });
      };
    };
  };


  // pass in editingState to toggle edit input view
  const handleDisplay = (editingState: boolean) => {

    if(editingState){
      return(
        <div className="lists-item-container">
          <p className="lists-item-title">{list.title}</p>
          <div className="lists-button-container">
            <button className="delete-lists-item-button" type="button" onClick={() => handleDelete()}>delete</button>
            <button className="lists-item-button" type="button" onClick={() => setCurrentlyEditing(!currentlyEditing)}>edit</button>
            <button className="lists-item-button" type="button" onClick={() => selectList(list)}>select</button>
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
            <button className="delete-lists-item-button" type="button" onClick={() => handleDelete()}>delete</button>
            <button className="lists-item-button" type="button" onClick={() => setCurrentlyEditing(!currentlyEditing)}>edit</button>
            <button className="lists-item-button" type="button" onClick={() => selectList(list)}>select</button>
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