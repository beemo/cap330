import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Wikigur</h1>
        </header>
        <div className="layout"><Layout /></div>

      </div>
    );
  }
}

export default App;
