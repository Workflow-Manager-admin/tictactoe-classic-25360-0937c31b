import { useState } from "react";

export const meta = () => [
  { title: "TicTacToe Classic" },
  { name: "description", content: "Play classic two-player TicTacToe in your browser!" }
];

// TicTacToe Main Container Component
// PUBLIC_INTERFACE
export default function Index() {
  // Board is an array of 9 cells, each "", "X", or "O"
  const EMPTY_BOARD = Array(9).fill("");
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);

  // PUBLIC_INTERFACE
  // Calculates the winner, or detects draw.
  function calculateWinner(squares) {
    // All possible win combinations
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  // Handles click on a cell
  function handleClick(idx) {
    if (winner || board[idx]) return;

    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      setDraw(false);
    } else if (newBoard.every(cell => cell)) {
      setDraw(true);
      setWinner("");
    } else {
      setXIsNext(!xIsNext);
    }
  }

  // PUBLIC_INTERFACE
  // Handles reset game
  function handleReset() {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setWinner("");
    setDraw(false);
  }

  // Prepare UI text and color theme
  const colors = {
    primary: "#ffffff", // background
    secondary: "#000000", // text
    accent: "#2196f3" // highlight
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = "Draw!";
  } else {
    status = `Turn: ${xIsNext ? "X" : "O"}`;
  }

  // UI rendering
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="flex flex-col items-center gap-7 w-full max-w-xs px-2">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ color: colors.secondary, letterSpacing: "-0.04em" }}
        >
          TicTacToe Classic
        </h1>
        <div
          className="text-lg font-medium mb-4"
          style={{ color: colors.accent }}
          aria-live="polite"
        >
          {winner || draw ? null : `Current Player: ${xIsNext ? "X" : "O"}`}
        </div>
        {/* Grid */}
        <div
          className="grid grid-cols-3 grid-rows-3 gap-2 mb-4"
          style={{
            backgroundColor: "#e9e9e9",
            borderRadius: 12,
            padding: 12,
            boxShadow: "0 2px 8px rgba(33, 150, 243, 0.05)"
          }}
        >
          {board.map((cell, idx) => (
            <button
              key={idx}
              className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-3xl font-bold rounded-lg border border-gray-300 transition-colors duration-150"
              style={{
                color: cell === "X" ? colors.secondary : cell === "O" ? colors.accent : colors.secondary,
                backgroundColor:
                  cell === ""
                    ? "#fff"
                    : cell === "X"
                    ? "#f5f5f5"
                    : "#e3f1fb",
                outline: winner && (winner === cell) ? `2px solid ${colors.accent}` : undefined,
                cursor: cell || winner || draw ? "not-allowed" : "pointer"
              }}
              onClick={() => handleClick(idx)}
              aria-label={`cell ${Math.floor(idx / 3) + 1},${(idx % 3) + 1}`}
              disabled={!!cell || !!winner || draw}
            >
              {cell}
            </button>
          ))}
        </div>
        {/* Status */}
        <div
          className="text-xl font-semibold pb-2"
          style={{ color: winner ? colors.accent : draw ? "#666" : colors.secondary }}
          aria-live="polite"
        >
          {status}
        </div>
        {/* Reset button */}
        <button
          className="px-6 py-2 rounded bg-[#2196f3] text-white font-semibold hover:bg-[#1765ae] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent-600"
          style={{ minWidth: "120px", fontSize: "1.1rem" }}
          onClick={handleReset}
          aria-label="Reset Game"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
