import React from 'react';
import { useState } from 'react';

import './Authenticated.css';

import Banner from '../Banner/Banner';
import Lists from '../Lists/Lists';

const initLists = [
  {
    title: 'list 1',
    id: 1
  },
  {
    title: '2',
    id: 2
  },
  {
    title: 'list 3000000000000000000000000000000000000000000',
    id: 3
  },
  {
    title: 'list 4',
    id: 4
  },
  {
    title: 'list someoensiogndogsneg 5 ',
    id: 5
  },
  {
    title: 'list about 6',
    id: 6
  },
  {
    title: 'list about 6',
    id: 6
  },
  {
    title: 'list about 6',
    id: 6
  },
  {
    title: 'list about 6',
    id: 6
  },
  {
    title: 'list about 6',
    id: 6
  },
  {
    title: 'list about 6',
    id: 6
  },
  {
    title: 'list about 6',
    id: 6
  },
  {
    title: 'list about 6',
    id: 6
  },
]

const Authenticated = ({ setIsAuthenticated }) => {

  const [lists, setLists] = useState(initLists);

  return(
    <div className="authenticated-container">
      <Banner setIsAuthenticated={setIsAuthenticated} />
      <Lists lists={lists}/>
    </div>
  );
};

export default Authenticated;