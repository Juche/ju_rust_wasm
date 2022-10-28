import React from 'react';
import '../styles/game.css';

function Square(props: { onCLick: () => void; value: null | string }) {
  return (
    <button className='square' onClick={() => props.onCLick()}>
      {props.value}
    </button>
  );
}

function calcWinner(squares: any[]) {
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

interface BoardProps {
  current: any;
  onClick: any;
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return <Square value={this.props.current[i]} onCLick={() => this.props.onClick(i)}></Square>;
  }

  render() {
    const n = 3;
    const line = Array(n).fill(null);

    const boardDoms = line.map((item, index) => {
      const row = line.map((item, _index) => this.renderSquare(index * n + _index));
      return <div className='boader-row'>{row}</div>;
    });

    return <div className='boader-ctn'>{boardDoms}</div>;
  }
}

interface GameProps {}
interface GameState {
  history: any;
  step: any;
  xIsNext: any;
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      step: 0,
      xIsNext: true,
    };
  }

  handleClick(i: string | number) {
    const { history, step } = this.state;
    const squares = history[step].squares.slice();
    const winner = calcWinner(squares);
    if (winner || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const _history = history.concat({ squares: squares });
    this.setState({ history: _history, step: step + 1, xIsNext: !this.state.xIsNext });
  }

  showRecord(i: number) {
    this.setState({ step: i, xIsNext: i % 2 });
  }

  restartGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      step: 0,
      xIsNext: true,
    });
  }

  render() {
    const { history, step } = this.state;
    const squares = history[step].squares;

    const historyList = this.state.history.map((item: any, index: number) => {
      return (
        <li className='history' key={index} onClick={() => this.showRecord(index)}>
          <button>记录{index}</button>
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
          <Board current={squares} onClick={(i: any) => this.handleClick(i)} />
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
