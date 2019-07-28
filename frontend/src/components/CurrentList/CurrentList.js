import React from 'react';
import { useState } from 'react';

import './CurrentList.css';

import ListItem from '../ListItem/ListItem';
import ListItemCreator from '../ListItemCreator/ListItemCreator';

const CurrentList = ({ activeList, setActiveList }) => {

  // modify this list to keep state current
  const [currentList, setCurrentList] = useState(activeList);

  // const handleDisplay = () => {
  //   if(activeList){
  //     return(

  //     );
  //   };
  // };

  return(
    <div className="current-list-wrapper">
    <button className="close-list-button" type="button" onClick={() => {setActiveList()}}>X</button>
      <ListItemCreator listTitle={currentList[0].title} listId={currentList[0].id} />
      <div className="current-list-container">
        <ListItem listId={currentList[0].id}  />
      </div>
    </div>
  );
};

export default CurrentList;