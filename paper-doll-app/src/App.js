import React, { Component } from 'react';
// import logo from '';
import './App.css';
import logo from "../src/images/hanger-line.png"
import Login from './components/login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>PAPER DOLLS</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <Login/>
          <p>NEW? SIGNUP HERE</p>
         
        </header>
      </div>
    );
  }
}

export default App;
