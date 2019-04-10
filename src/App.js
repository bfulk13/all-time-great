import React, { Component } from 'react';
import routes from './routes'
import './App.css';
import Nav from './Components/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* Need to import Nav Barnpm */}
      <Nav />
       {routes}
      </div>
    )
  }
}

export default App;
