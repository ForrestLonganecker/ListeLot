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

  // modify this list to keep state current
  const [currentList, setCurrentList] = useState(activeList);
  const [currentItems, setCurrentItems] = useState();


  useEffect(() => {
    if(currentList){
      let data = {
        listId: activeList.id
      };

      axios.post(activeListUrl, data)
      .then((res) => {
        console.log(res.data);
        let returnList = res.data.reverse();
        setCurrentItems(returnList);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [currentList]);

  const displayList = (inputList) => {


    if(inputList){
      let returnList = inputList.map((item) => {
        return(
          <ListItem key={item.id} listId={currentList.id} text={item.text} isComplete={item.isComplete}/>
        )
      });
      
      return returnList
    };
  };

  return(
    <div className="current-list-wrapper">
    <button className="close-list-button" type="button" onClick={() => {setActiveList()}}>X</button>
      <ListItemCreator listTitle={currentList.title} listId={currentList.id} setCurrentItems={setCurrentItems} />
      <div className="current-list-container">
        {displayList(currentItems)}
      </div>
    </div>
  );
};

export default CurrentList;