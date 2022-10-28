import React from 'react';
import '../styles/game.css';

function Square(props) {
  return (
    <button className='square' onClick={() => props.onCLick()}>
      {props.value}
    </button>
  );
}

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.current[i]} onCLick={() => this.props.onClick(i)}></Square>;
  }

  render() {
    return (
      <div className='boader-ctn'>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      current: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const { history, current } = this.state;
    const squares = history[current].squares.slice();
    const winner = calcWinner(squares);
    if (winner || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const _history = history.concat({ squares: squares });
    this.setState({ history: _history, current: current + 1, xIsNext: !this.state.xIsNext });
  }

  showRecord(i) {
    this.setState({ current: i });
  }
  实现;
  restartGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      current: 0,
      xIsNext: true,
    });
  }

  render() {
    const { history, current } = this.state;
    const squares = history[current].squares;

    const historyList = this.state.history.map((item, index) => {
      return (
        <li className='history' key={index} onClick={() => this.showRecord(index)}>
          记录{index}
        </li>
      );
    });

    const winner = calcWinner(squares);
    let status;
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className='game'>
        <div className='game-boader'>
          <Board current={squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className='game-info'>
          <div className='status'>{status}</div>
          <button className='restart' onClick={() => this.restartGame()}>
            重新开始
          </button>
          <ol className=''>{historyList}</ol>
        </div>
      </div>
    );
  }
}

export { Game };
