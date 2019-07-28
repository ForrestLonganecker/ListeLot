import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './CurrentList.css';

import ListItem from '../ListItem/ListItem';
import ListItemCreator from '../ListItemCreator/ListItemCreator';

let activeListUrl;
if(process.env.NODE_ENV === 'production'){
  activeListUrl = 'https://listelot.herokuapp.com/listItems/activeList'
};
if(process.env.NODE_ENV === 'development'){
  activeListUrl = 'http://localhost:4000/listItems/activeList'; 
};

const CurrentList = ({ activeList, setActiveList }) => {

  const [currentItems, setCurrentItems] = useState();


  useEffect(() => {

    const interval = setInterval(() => {
        let data = {
          listId: activeList.id
        };
  
        axios.post(activeListUrl, data)
        .then((res) => {
          setCurrentItems(res.data.reverse());
        })
        .catch((err) => {
        });
    }, 5000);
    return () => clearInterval(interval);
  }, [activeList.id]);

  const displayList = (inputList) => {


    
    if(inputList){
      let returnList = inputList.map((item) => {
        return(
          <ListItem key={item.id} currentItem={item} setCurrentItems={setCurrentItems} currentItems={currentItems} />
        )
      });
      
      return returnList
    };
  };

  return(
    <div className="current-list-wrapper">
    <button className="close-list-button" type="button" onClick={() => {setActiveList()}}>X</button>
      <ListItemCreator listTitle={activeList.title} listId={activeList.id} setCurrentItems={setCurrentItems} />
      <div className="current-list-container">
        {displayList(currentItems)}
      </div>
    </div>
  );
};

export default CurrentList;