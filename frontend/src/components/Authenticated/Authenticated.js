import React from 'react';
import { useState } from 'react';
// import axios from 'axios';

import './Authenticated.css';

import Banner from '../Banner/Banner';
import Lists from '../Lists/Lists';
import CurrentList from '../CurrentList/CurrentList';

// let getListsUrl;
// if(process.env.NODE_ENV === 'production'){
//   getListsUrl = 'https://listelot.herokuapp.com/lists/getAll'
// };
// if(process.env.NODE_ENV === 'development'){
//   getListsUrl = 'http://localhost:4000/lists/getAll'; 
// };

const Authenticated = ({ isAuthenticated, setIsAuthenticated }) => {

  const [activeList, setActiveList] = useState();

  const handleDisplay = (viewState) => {

    if(viewState){
      return(
        <CurrentList activeList={activeList} setActiveList={setActiveList} />
      );
    } else {
      return(
        <Lists activeList={activeList} setActiveList={setActiveList} />
      );
    };
  };
  
  return(
    <div className="authenticated-container">
      <Banner setIsAuthenticated={setIsAuthenticated} />
      {handleDisplay(activeList)}
    </div>
  );
};

export default Authenticated;