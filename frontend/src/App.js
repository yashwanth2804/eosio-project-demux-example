import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

// Add routing config
import routes from './routes'
// Add SCSS Styling
import './assets/styles/core.css'

class App extends Component {
  render() {
    return (
      <Router>
        {renderRoutes(routes)}
      </Router>
    );
  }
}

export default App;
