import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './Authenticated.css';

import Banner from '../Banner/Banner';
import Lists from '../Lists/Lists';

let getListsUrl;
if(process.env.NODE_ENV === 'production'){
  getListsUrl = 'https://listelot.herokuapp.com/lists/getAll'
};
if(process.env.NODE_ENV === 'development'){
  getListsUrl = 'http://localhost:4000/lists/getAll'; 
};

const Authenticated = ({ isAuthenticated, setIsAuthenticated }) => {

  const [lists, setLists] = useState();

  useEffect(() => {
    axios.get(getListsUrl)
    .then((res) => {
      setLists(res.data);
    })
    .catch((err) => {
    });
  });

  return(
    <div className="authenticated-container">
      <Banner setIsAuthenticated={setIsAuthenticated} />
      <Lists lists={lists}/>
    </div>
  );
};

export default Authenticated;