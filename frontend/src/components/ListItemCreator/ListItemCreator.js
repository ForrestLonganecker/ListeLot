import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListItemCreator.css';

let createItemUrl;
if(process.env.NODE_ENV === 'production'){
  createItemUrl = 'https://listelot.herokuapp.com/listItems/create'
}
if(process.env.NODE_ENV === 'development'){
  createItemUrl = 'http://localhost:4000/listItems/create'; 
}

const ListItemCreator = ({ listTitle, listId, setCurrentItems }) => {

  const [text, setText] = useState('');

  const handleCreateItem = (e) => {
    e.preventDefault();

    if(text.length > 25 || text.length < 1){
      alert(`Adjust text length: ${text.length}. Must be 1-25 characters`)
    } else {
      let data = {
        text: text,
        listId: listId
      };

      axios.post(createItemUrl, data)
      .then((res) => {
        setCurrentItems(items => [res.data, ...items])
        setText('');
      })
      .catch((err) => {
        alert('something went wrong, please try again.');
      });
    };
  }

  return(
    <form onSubmit={handleCreateItem} className="list-creator-form">
      <label className="create-list-label">{listTitle}</label>
      <input className="create-list-input" type="text" placeholder="add a new item to your list" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="create-list-button" type="submit">Submit</button>
    </form>
  );
};

export default ListItemCreator;