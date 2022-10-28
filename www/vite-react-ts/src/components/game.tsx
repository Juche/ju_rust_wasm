import React from 'react';
import '../styles/game.css';

// export default function Game() {
//   return <h1>Juching Test React</h1>;
// }

class Square extends React.Component {
  render() {
    return <button className='square'>{this.props.value}</button>;
  }
}

class Board extends React.Component {
  renderSquare() {
    return <Square></Square>;
  }

  render() {
    const status = 'Next Player X';
    return (
      <div className='boader-ctn'>
        <div className='status'>{status}</div>
        <div className='boader-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='boader-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='boader-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className='game'>
        <div className='game-boader'>
          <Board />
        </div>
        <div className='game-info'>
          <div className=''></div>
          <ol className=''></ol>
        </div>
      </div>
    );
  }
}

export { Square, Board, Game };
