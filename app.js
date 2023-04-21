const gameBoard = () => {
  const gameboard = Array(9).fill("");
  let win = false;

  const getGameboard = () => gameboard;
  const setTile = (mark, index) => {
    gameBoard[index] = mark;
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

  return { getGameboard, setTile, checkWinner };
};

const game = gameBoard();

game.setTile("X", 8);
console.log(game.checkWinner("X"));
