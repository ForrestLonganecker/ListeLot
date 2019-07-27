import React from 'react';
import axios from 'axios';

import './ListsItem.css';

let deleteListUrl;
if(process.env.NODE_ENV === 'production'){
  deleteListUrl = 'https://listelot.herokuapp.com/lists/delete'
}
if(process.env.NODE_ENV === 'development'){
  deleteListUrl = 'http://localhost:4000/lists/delete'; 
}

const ListsItem = ({ list }) => {

  const handleDelete = (deleteId) => {

    let data = {
      listId: deleteId
    }

    axios.post(deleteListUrl, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }); 
  };

  return(
    <div className="lists-item-container">
      <p className="lists-item-title">{list.title}</p>
      <div className="lists-button-container">
        <button className="delete-lists-item-button" type="button" onClick={() => handleDelete(list.id)}>delete</button>
        <button className="lists-item-button" type="button">edit</button>
        <button className="lists-item-button" type="button">select</button>
      </div>
    </div>
  );
};

export default  ListsItem;