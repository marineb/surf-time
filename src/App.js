import React, { Component } from 'react';
import TidesList from './lib/tides-list';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (<TidesList />);
  }
}

export default App;
