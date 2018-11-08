import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
// Value of the square is passed from the board because the board manages the
// state of the squares. This allows the squares to be compared to each other.
  return (
    <button
      className="square"
      // On a click event we're changing the value assigned to square #i
      // using the onClick function from the board so that the value of the
      // square stored in the board array/list can be updated.
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}


class Board extends React.Component {
// This will render the squares on the board and will assigning squares a value
// based on their value in the array/list by using their index position.
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }


// Creates the board.
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


// This component stores the history of the game in an array/list. Sort of like
// a list of save files.
class Game extends React.Component {
// This function handles clicks when a Square component recognizes that a click
// event has happended and calls for this function.
  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // If someone has won or the square is occupied already then the game stops
    // responding and filling in squares.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // Add the current history of squares to the array/list of history states.
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  // Construct the game with an empty history array/list and with the first turn
  // being assigned to X
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    // Status can be changed based on the status of the game. 'let' variables
    // are able to be altered.
    let status;

    if (winner) {
      // If someone passes the win check defined by the conditions in the func.
      // then the game states that there's a winner.
      status = 'Winner: ' + winner;
    }
    else {
      // If xIsNext is true then we get the board saying X is next, otherwise it
      // will say that O is next.Same logic as the handle click assigning X or O
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
    const [a,b,c] = lines[i];
    // If square[a] is occupied AND sq[a] === sq[b] AND sq[a] === sq[c]
    // then someone has won.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // returns the value inside of the first square checked because this is
      // symbol that won.
      return squares[a]
    }
  }
  // if the above failed then that means that none of the win conditions have
  // been satisfied yet.
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
