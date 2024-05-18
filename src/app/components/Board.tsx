import { useEffect, useRef, useState } from "react";

const EMPTY = null;

const calculateWinner = (squares: string[]) => {
  for (let i = 0; i < 9; i += 3) {
    if (squares[i] == "O" && squares[i + 1] == "O" && squares[i + 2] == "O")
      return 1;
    else if (
      squares[i] == "X" &&
      squares[i + 1] == "X" &&
      squares[i + 2] == "X"
    )
      return -1;
  }

  for (let i = 0; i < 3; i++) {
    if (squares[i] == "O" && squares[i + 3] == "O" && squares[i + 6] == "O")
      return 1;
    else if (
      squares[i] == "X" &&
      squares[i + 3] == "X" &&
      squares[i + 6] == "X"
    )
      return -1;
  }

  // Check diagonals
  if (squares[0] === "O" && squares[4] === "O" && squares[8] === "O") return 1;
  if (squares[2] === "O" && squares[4] === "O" && squares[6] === "O") return 1;

  if (squares[0] === "X" && squares[4] === "X" && squares[8] === "X") return -1;
  if (squares[2] === "X" && squares[4] === "X" && squares[6] === "X") return -1;

  return null; // Return null if no winner
};

const Board = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [message, setMessage] = useState<string | null>(null);
  const isComputerMove = useRef<boolean>(false);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner == 1) {
      setMessage("You Won~!");
      return;
    } else if (winner == -1) {
      setMessage("Computer Won~!");
      return;
    }

    const isBoardFull = squares.every((square) => square !== null);

    if (isBoardFull) {
      setMessage("It's a tie ^_^");
      return;
    }

    if (isComputerMove.current) {
      setTimeout(() => computerMove(), 100); // Delay computer move for better UX
    }
  }, [squares]);

  const computerMove = () => {
    isComputerMove.current = false;

    const availableSquares = squares
      .map((square, index) => ({ square, index }))
      .filter(({ square }) => square === EMPTY);

    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    const newSquares = squares.slice();
    newSquares[availableSquares[randomIndex].index] = "X";
    setSquares(newSquares);
  };

  const handleClick = (index: number) => {
    if (message) return;
    if (squares[index]) return;

    const newSquares = squares.slice();
    newSquares[index] = "O";
    isComputerMove.current = true;
    setSquares(newSquares);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setMessage(null);
    isComputerMove.current = false;
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 w-72 mx-auto mt-10">
        {squares.map((value, index) => (
          <div
            key={index}
            className="w-24 h-24 flex items-center justify-center border-2 border-gray-500 hover:border-blue-500 text-5xl cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      {message && (
        <>
          <h1 className="text-3xl font-bold text-center mt-10">{message}</h1>
          <button
            className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={restartGame}
          >
            Restart Game
          </button>
        </>
      )}
    </>
  );
};

export default Board;
