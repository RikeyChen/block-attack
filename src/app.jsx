import React, { Component } from 'react';
import './stylesheets/app.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
        </header>
      </div>
    );
  }
}

export default App;
