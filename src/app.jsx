import React, { Component } from 'react';
import './stylesheets/app.css';
import './stylesheets/game_container.css';
import Game from './game/game';

class App extends Component {
  constructor(props) {
    super(props);
    this.game = new Game();
    this.state = {
      board: this.game.board,
    };
  }

  render() {
    const { board } = this.state;
    const grid = (
      board.grid.map((row, idx) => (
        <div className="row" key={idx}>
          <div className="">{row[0]}</div>
          <div className="">{row[1]}</div>
          <div className="">{row[2]}</div>
          <div className="">{row[3]}</div>
          <div className="">{row[4]}</div>
          <div className="">{row[5]}</div>
          <div className="">{row[6]}</div>
          <div className="">{row[7]}</div>
          <div className="">{row[8]}</div>
          <div className="">{row[9]}</div>
        </div>
      ))
    );

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
              <div className="block-game">
                {grid}
              </div>
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
