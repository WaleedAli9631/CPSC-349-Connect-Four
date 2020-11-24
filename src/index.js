import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  var backCol = 'white'; 
  if(props.value == 'X')
  {
    backCol = 'red';
  }
  if(props.value == 'O')
  {
    backCol = 'blue';
  }
  return (
    <button className="square" style={{
      backgroundColor: backCol,
    }} onClick={props.onClick}>
      {/* {props.value} */}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  state = {
    board: [[0, 1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12, 13],
            [14, 15, 16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25, 26, 27],
            [28, 29, 30, 31, 32, 33, 34],
            [35, 36, 37, 38, 39, 40, 41],]
  };

  render() {
    const { board } = this.state;

    return (
      <div>
        {board.map((row, i) => (
          <div key={i}       >
            {row.map((col, j) => (
              this.renderSquare(board[i][j])
            ))}
          </div>
        ))}
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
          squares: Array(42).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    var root = i;
    for(var j = 0; j < 6; j++)
    {
        if (root + 7 <= 41)
        {
          root = root + 7;
        }
    }
    console.log(root);
    if(squares[root] == null)
    {
      squares[root] = this.state.xIsNext ? "X" : "O";
    }
    else if(squares[root - 7] == null)
    {
      squares[root - 7] = this.state.xIsNext ? "X" : "O";
    }
    else if(squares[root - 14] == null)
    {
      squares[root - 14] = this.state.xIsNext ? "X" : "O";
    }
    else if(squares[root - 21] == null)
    {
      squares[root - 21] = this.state.xIsNext ? "X" : "O";
    }
    else if(squares[root - 28] == null)
    {
      squares[root - 28] = this.state.xIsNext ? "X" : "O";
    }
    else if(squares[root - 35] == null)
    {
      squares[root - 35] = this.state.xIsNext ? "X" : "O";
    }

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }


  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);


    var tie = true;

    for(var i = 0; i < 41; i++)
    {
      if(current.squares[i] == null)
      {
        tie = false;
      }
    }
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + i :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });


    let status;
    if (winner || tie) {
      if(winner)
      {
        status = "Winner: " + winner;
      }
      if(tie)
      {
        status = "Tie"
      }
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }



    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
var reee = false;
  for (let i = 0; i < 41; i++) {
    if (squares[i] && squares[i] === squares[i + 1] && squares[i] === squares[i + 2] && squares[i] === squares[i + 3]) {
      return squares[i];
    }
    if (squares[i] && squares[i] === squares[i - 1] && squares[i] === squares[i - 2] && squares[i] === squares[i - 3]) {
      return squares[i];
    }
    if (squares[i] && squares[i] === squares[i - 7] && squares[i] === squares[i - 14] && squares[i] === squares[i - 21]) {
      return squares[i];
    }
    if (squares[i] && squares[i] === squares[i + 7] && squares[i] === squares[i + 14] && squares[i] === squares[i + 21]) {
      return squares[i];
    }
    if (squares[i] && squares[i] === squares[i + 8] && squares[i] === squares[i + 16] && squares[i] === squares[i + 24]) {
      return squares[i];
    }
    if (squares[i] && squares[i] === squares[i - 8] && squares[i] === squares[i - 16] && squares[i] === squares[i - 24]) {
      return squares[i];
    }
    if (squares[i] && squares[i] === squares[i + 6] && squares[i] === squares[i + 12] && squares[i] === squares[i + 18]) {
      return squares[i];
    }
    if (squares[i] && squares[i] === squares[i - 6] && squares[i] === squares[i - 12] && squares[i] === squares[i - 18]) {
      return squares[i];
    }
    if(squares[i] == null)
    {
      reee = true;
    }
  }
  return null;
}