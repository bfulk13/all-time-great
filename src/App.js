import React, { Component } from 'react';
import routes from './routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* Need to import Nav Barnpm */}

       {routes}
      </div>
    )
  }
}

export default App;
