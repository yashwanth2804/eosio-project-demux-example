import React from 'react';
import { object, func } from 'prop-types';

import Logo from '../assets/img/logo-inverted.svg';
import Posts from './Posts';
import Create from './Create';

const Home = (props, context) => {
  console.log("Home context:");
  console.log(context);
  return (
    <div className={ "layoutStandard " + (context.store.createOpen ? 'createOpen' : '') }>
      <div className="logo">
        <a href="/"><img src={Logo} alt="Eos.io"/></a>
      </div>
      <div className="search">
        <input placeholder="Search" onKeyUp={context.handleKeyPress} />
      </div>
      <div className="main">
        <div className="toggleCreate" onClick={context.toggleCreate} >
          <span></span>
          <span></span>
        </div>
        <Create
          handlePostChange={context.handlePostChange}
          handlePostSubmit={context.handlePostSubmit}
        />
      <Posts props={context.store} />
      </div>
    </div>
  )
}

Home.contextTypes = {
  store: object,
  toggleCreate: func,
  handlePostChange: func,
  handlePostSubmit: func,
};

export default Home;
// className={ "layoutStandard " + (props.createOpen ? 'createOpen' : '') }
// }, { createOpen, handleKeyPress, handlePostChange, handlePostSubmit, toggleCreate, }
