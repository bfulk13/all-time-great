import React, { Component } from 'react';
import routes from './routes'
import './App.css';
import Login from './Components/Login/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* Need to import Nav Barnpm */}
       <Login />
       {routes}
      </div>
    )
  }
}

export default App;
