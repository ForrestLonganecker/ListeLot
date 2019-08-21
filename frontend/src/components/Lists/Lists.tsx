import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './Lists.css';

import ListsItem from '../ListsItem/ListsItem';
import ListCreator from '../ListCreator/ListCreator';

// set up routes
let getListsUrl: string;
if(process.env.NODE_ENV === 'production'){
  getListsUrl = 'https://listelot.herokuapp.com/lists/getAll'
};
if(process.env.NODE_ENV === 'development'){
  getListsUrl = 'http://localhost:4000/lists/getAll'; 
};


interface Props {
  activeList: Array<String>,
  setActiveList: Function
}

interface List {
  id: number
}

// pass in activeList
const Lists = ({ activeList, setActiveList }: Props) => {

  const [lists, setLists] = useState();
  // used to pass state from child of Lists to parent of Lists
  const [selectedList, setSelectedList] = useState();

  const selectList = (list: Array<String>) => {
    // sets active list to the value of selected list
    setSelectedList(list);
    setActiveList(selectedList);
  };


  // grab updated list of lists on component mount or activeList change
  useEffect(() => {
    axios.get(getListsUrl)
    .then((res) => {
      setLists(res.data.reverse());
    })
    .catch((err) => {
    });
  }, [activeList]);

  const displayLists = (inputLists: Array<List>) => {
    
    if(inputLists){

      // create the return item out of the updatedList array
      let returnLists = inputLists.map((list) => {
        return(
          <ListsItem key={list.id} lists={lists} list={list} setLists={setLists} selectList={selectList} />
        );
      });

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