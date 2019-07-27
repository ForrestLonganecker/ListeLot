import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './Lists.css';

import ListsItem from '../ListsItem/ListsItem';
import ListCreator from '../ListCreator/ListCreator';

let getListsUrl;
if(process.env.NODE_ENV === 'production'){
  getListsUrl = 'https://listelot.herokuapp.com/lists/getAll'
};
if(process.env.NODE_ENV === 'development'){
  getListsUrl = 'http://localhost:4000/lists/getAll'; 
};

const Lists = ({ activeList, setActiveList }) => {

  const [lists, setLists] = useState();
  const [deletedList, setDeletedList] = useState();

  useEffect(() => {
    axios.get(getListsUrl)
    .then((res) => {
      setLists(res.data.reverse());
    })
    .catch((err) => {
    });
  }, [activeList]);

  const displayLists = (inputLists) => {
    
    if(inputLists){
      let updatedLists = inputLists
      if(deletedList){
        updatedLists = inputLists.filter(list => {
          if(list.id !== deletedList){
            return list;
          };
        });
      };
      
      // create the return item out of the updatedList array
      let returnLists = updatedLists.map((list) => {
        return(
          <ListsItem key={list.id} list={list} setDeletedList={setDeletedList} />
        );
      });

      // clear out deletedList and update local list state
      if(deletedList){
        setDeletedList(null);
        setLists(updatedLists);
      };

      return returnLists;  
    };
  };


  return(
    <div className="lists-wrapper">
      <ListCreator setLists={setLists} />
      <div className="lists-container">
        {displayLists(lists)}
      </div>
    </div>
  );
};

export default Lists;