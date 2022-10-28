import React from 'react';
import '../styles/game.css';

// export default function Game() {
//   return <h1>Juching Test React</h1>;
// }

const step = 0;
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className='square'
        onClick={() => this.setState({ value: this.props.value % 2 ? 'X' : 'O' })}
      >
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i}></Square>;
  }

  render() {
    const status = 'Next Player X';
    return (
      <div className='boader-ctn'>
        <div className='status'>{status}</div>
        <div className='boader-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='boader-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='boader-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
