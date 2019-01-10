import React, { Component } from 'react';
import './stylesheets/app.css';
import './stylesheets/game_container.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-main">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
          <div className="main">
            <div className="info-section">
              <div>UFO</div>
              <div>Level</div>
              <div>Score</div>
            </div>
            <div className="game-container">
              <div className="block-game" />
              <div className="rocket-ship-container">
                <div className="force-field">
                  <div className="rocket-ship" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
