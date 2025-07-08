const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board, currentPlayer, gameActive, winnerCells;

function initGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  winnerCells = [];
  renderBoard();
  updateStatus();
}

function renderBoard() {
  boardEl.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = board[i];
    if (winnerCells.includes(i)) cell.classList.add("win");
    cell.addEventListener("click", () => handleCellClick(i));
    boardEl.appendChild(cell);
  }
}

function handleCellClick(idx) {
  if (!gameActive || board[idx]) return;
  board[idx] = currentPlayer;
  if (checkWinner()) {
    gameActive = false;
    updateStatus(true);
    renderBoard();
    return;
  }
  if (board.every((cell) => cell)) {
    gameActive = false;
    statusEl.textContent = "It's a Draw!";
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
  renderBoard();
}

function updateStatus(won = false) {
  if (won) {
    statusEl.textContent = `Player ${currentPlayer} Wins! 🎉`;
  } else {
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diags
  ];
  for (const combo of wins) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winnerCells = combo;
      return true;
    }
  }
  return false;
}

resetBtn.addEventListener("click", initGame);

// Start the game
initGame();
