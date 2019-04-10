import React, { Component } from 'react';
import routes from './routes'
import './App.css';
import Login from './Components/Login/Login'
import Nav from './Components/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* Need to import Nav Barnpm */}
      <Nav />
       <Login />
       {routes}
      </div>
    )
  }
}

export default App;
