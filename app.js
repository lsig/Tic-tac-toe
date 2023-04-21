const gameBoard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let win = false;
  let draw = false;

  const getGameboard = () => gameboard;
  const boardNotFull = () => gameboard.some((val) => val === "");
  const setTile = (mark, index) => {
    if (!gameboard[index]) {
      gameboard[index] = mark;
    }
    if (!boardNotFull) {
      draw = true;
    }
  };
  const checkWinner = (mark) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winningCombos.forEach((combo) => {
      const playerCombo = combo.map((index) => gameBoard[index]);
      const winner = playerCombo.every((val) => val === mark);
      if (winner) {
        win = true;
        return;
      }
    });
    return win;
  };

  const checkDraw = () => draw;

  return { getGameboard, setTile, checkWinner, checkDraw };
})();

const player = (name, mark) => {
  let winner = false;
  const setMark = () => {
    gameBoard.setTile(mark);
    winner = gameBoard.checkWinner(mark);
  };
  return { setMark };
};
