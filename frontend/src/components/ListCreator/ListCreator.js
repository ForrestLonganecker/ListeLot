import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListCreator.css';

let createListUrl;
if(process.env.NODE_ENV === 'production'){
  createListUrl = 'https://listelot.herokuapp.com/lists/create'
}
if(process.env.NODE_ENV === 'development'){
  createListUrl = 'http://localhost:4000/lists/create'; 
}

const ListCreator = () => {

  const [title, setTitle] = useState('');

  const handleCreateList = (e) => {
    e.preventDefault();

    if(title.length > 25 || title.length < 1){
      alert(`Adjust title length: ${title.length}. Must be 1-25 characters`);
    } else {
      let data = {
        title: title
      };

      axios.post(createListUrl, data)
      .then((res) => {
        // pass up the addition
        setTitle('')
      })
      .catch((err) => {
        alert('something went wrong');
      });
    }
  };

  return(
    <form onSubmit={handleCreateList} className="list-creator-form">
      <label className="create-list-label">Create new list</label>
      <input className="create-list-input" type="text" placeholder="25 characters max" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button className="create-list-button" type="submit">Submit</button>
    </form>
  );
};

export default ListCreator;