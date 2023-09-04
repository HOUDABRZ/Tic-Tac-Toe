import React, { useState } from "react";
import "./tic.css";

const TicTacToe = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [game, setGame] = useState(false);
  const [tie, setTie] = useState(false);
  const checkTie = (squares) => {
    if (squares.every((cell) => cell !== "") && !winner) {
      setTie(true);
      setGame(true);
    }
  };

  const checkWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
          setGame(true);
        }
      });
    }
  };
  const reset = () => {
    setCells(Array(9).fill(""));
    setWinner(null);
    setGame(false);
    setTie(false);
  };

  const handleClick = (num) => {
    if (!game) {
      let squares = [...cells];
      if (cells[num] !== "") {
        return;
      }
      if (turn === "X") {
        squares[num] = "X";
        setTurn("O");
      } else {
        squares[num] = "O";
        setTurn("X");
      }
      checkWinner(squares);
      setCells(squares);
      checkTie(squares);
    } else {
      reset();
    }
  };
  const Result = () => {
    if (winner) {
      return (
        <>
          <p>{winner} is the winner!</p>
        </>
      );
    } else if (tie) {
      return (
        <>
          <p>It's a Tie!</p>
        </>
      );
    }
  };
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };
  return (
    <div className="container">
      <h1>Welcome to the Game</h1>
      <table>
        <tr>
          <Cell num={0} />
          <Cell num={1} />
          <Cell num={2} />
        </tr>
        <tr>
          <Cell num={3} />
          <Cell num={4} />
          <Cell num={5} />
        </tr>
        <tr>
          <Cell num={6} />
          <Cell num={7} />
          <Cell num={8} />
        </tr>
      </table>
      <p>Turn : {turn}</p>

      <Result />

      <button onClick={() => reset()}>Play Again</button>
    </div>
  );
};
export default TicTacToe;
