import React from 'react';
import '../styles/game.css';

// export default function Game() {
//   return <h1>Juching Test React</h1>;
// }

// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   // this.state = {
//   //   //   value: null,
//   //   // };
//   // }

//   render() {
//     return (
//       <button className='square' onClick={() => this.props.onCLick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

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

const history = [
  // Before first move
  {
    squares: [null, null, null, null, null, null, null, null, null],
  },
  // After first move
  {
    squares: [null, null, null, null, 'X', null, null, null, null],
  },
  // After second move
  {
    squares: [null, null, null, null, 'X', null, null, null, 'O'],
  },
  // After third move
  {
    squares: [null, 'X', null, null, 'X', null, null, null, 'O'],
  },
];

class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  renderSquare(i) {
    return <Square value={this.props.current[i]} onCLick={() => this.props.onClick(i)}></Square>;
  }

  render() {
    // const winner = calcWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = `Winner is ${winner}`;
    // } else {
    //   status = `Next Player ${this.state.xIsNext ? 'X' : 'O'}`;
    // }
    return (
      <div className='boader-ctn'>
        {/* <div className='status'>{status}</div> */}
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

  showRecord(i) {
    this.setState({ squares: history[i].squares });
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

  render() {
    const { history, current } = this.state;

    const winner = calcWinner(history[current].squares);
    let status;
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className='game'>
        <div className='game-boader'>
          <Board current={history[current].squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className='game-info'>
          <div className='status'>{status}</div>
          <ol className=''>
            {/* <li className='history' onClick={() => this.showRecord(1)}>
              记录1
            </li>
            <li className='history' onClick={() => this.showRecord(2)}>
              记录2
            </li>
            <li className='history' onClick={() => this.showRecord(3)}>
              记录3
            </li> */}
          </ol>
        </div>
      </div>
    );
  }
}

export { Game };
