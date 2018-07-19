import React from 'react';

import Logo from '../assets/img/logo-inverted.svg';
import Posts from './Posts';
import Create from './Create';

const Home = ({ createOpen, handleKeyPress, handlePostChange, handlePostSubmit, toggleCreate, ...props }) => (
  <div className={ "layoutStandard " + (createOpen ? 'createOpen' : '') }>
    <div className="logo">
      <a href="/"><img src={Logo} alt="Eos.io"/></a>
    </div>
    <div className="search">
      <input placeholder="Search" onKeyUp={handleKeyPress} />
    </div>
    <div className="main">
      <div className="toggleCreate" onClick={toggleCreate} >
        <span></span>
        <span></span>
      </div>
      <Create
        handlePostChange={handlePostChange}
        handlePostSubmit={handlePostSubmit}
      />
      <Posts {...props} />
    </div>
  </div>
)
export default Home;
