import React from 'react';

import './Lists.css';

import ListsItem from '../ListsItem/ListsItem';
import ListCreator from '../ListCreator/ListCreator';

const Lists = ({ lists }) => {

  const displayLists = (inputLists) => {

    if(lists){
      const returnList = inputLists.map((list) => {
        return(
          <ListsItem key={list.id} list={list}/>
        );
      });
  
      return returnList;  
    };
  };

  return(
    <div className="lists-wrapper">
      <ListCreator />
      <div className="lists-container">
        {displayLists(lists)}
      </div>
    </div>
  );
};

export default Lists;