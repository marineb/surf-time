import React, { Component } from 'react';
import TidesList from './lib/tides-list';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="l-center">
        <h1 className="main-heading">When should Marine surf?</h1>
        <TidesList />
      </div>
    );
  }
}

export default App;
