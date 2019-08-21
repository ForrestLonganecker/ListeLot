import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './CurrentList.css';

import ListItem from '../ListItem/ListItem';
import ListItemCreator from '../ListItemCreator/ListItemCreator';


// set up routes for production/development
let activeListUrl: string;
if(process.env.NODE_ENV === 'production'){
  activeListUrl = 'https://listelot.herokuapp.com/listItems/activeList'
};
if(process.env.NODE_ENV === 'development'){
  activeListUrl = 'http://localhost:4000/listItems/activeList'; 
};

interface Props {
  activeList: List,
  setActiveList: Function
}

interface List {
  id: number,
  title: string
}

interface Item {
  id: number,
  listId: number,
  isComplete: boolean,
  text: string
}

const CurrentList = ({ activeList, setActiveList }: Props) => {

  // set up state for items in the active list 
  const [currentItems, setCurrentItems] = useState();


  useEffect(() => {

    // set an interval when current active list is selected to 
    // continually make requests
    const interval = setInterval(() => {
      let data = {
        listId: activeList.id
      };

      axios.post(activeListUrl, data)
      .then((res) => {
        // set Current items to the result.data reverse it so 
        // new items come first
        setCurrentItems(res.data.reverse());
      })
      .catch((err) => {
      });
      // make this call every 2 seconds
  }, 2000);
  // clear the interval so we no longer continue to make requests
  return () => clearInterval(interval);

  // run this use effect every time the activeList.id changes
  }, [activeList.id]);

  const displayList = (inputList: Array<Item>) => {

    if(inputList){
      // create the display list items 
      let returnList = inputList.map((item) => {
        return(
          <ListItem key={item.id} currentItem={item} setCurrentItems={setCurrentItems} currentItems={currentItems} />
        )
      });
      
      // output the created items to be displayed below
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