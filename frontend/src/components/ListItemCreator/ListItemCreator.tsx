import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './ListItemCreator.css';

// set up routes
let createItemUrl: string;
if(process.env.NODE_ENV === 'production'){
  createItemUrl = 'https://listelot.herokuapp.com/listItems/create'
}
if(process.env.NODE_ENV === 'development'){
  createItemUrl = 'http://localhost:4000/listItems/create'; 
}

interface Props {
  listTitle: string,
  listId: number,
  setCurrentItems: Function
}

const ListItemCreator = ({ listTitle, listId, setCurrentItems }: Props) => {

  const [text, setText] = useState('');

  const handleCreateItem = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
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
        // add new item to the top of list
        setCurrentItems((items: Array<String>) => [res.data, ...items]);
        // clear input field
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