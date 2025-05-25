import { useState } from 'react'

function Square({value, onSquareClick}) {
  return (
  <button className='square' onClick={onSquareClick}>{value}</button>
  );
}

function Board({xIsNext, Squares, onPlay}) {

  function handleClick(i) {
    if(Squares[i] || calculateWinner(Squares)) return;
    
    const nextSquares = Squares.slice();

    nextSquares[i] = (xIsNext) ? 'X' : 'O';

    onPlay(nextSquares);
  }

  const winner = calculateWinner(Squares);
  let status = ''
  if(winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={Squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={Squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={Squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={Squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={Squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={Squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={Squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={Squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={Squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((Squares, move) => {
    let description = '';
    if(move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} Squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(Squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if(Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
      return Squares[a];
    }
  }

  return null;
}