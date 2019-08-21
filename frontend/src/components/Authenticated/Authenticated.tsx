import React from 'react';
import { useState } from 'react';

import './Authenticated.css';

import Banner from '../Banner/Banner';
import Lists from '../Lists/Lists';
import CurrentList from '../CurrentList/CurrentList';

interface Props {
  setIsAuthenticated: Function
}

// when authenticated we display this component
const Authenticated = ({ setIsAuthenticated }: Props) => {

  const [activeList, setActiveList] = useState();

  const handleDisplay = (viewState: Array<String>) => {

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