const player = (mark) => {
  const getMark = () => mark;
  return { getMark };
};

const grid = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let count = 0;
  let draw = false;
  const player_one = player("X");
  const player_two = player("O");
  const players = [player_one, player_two];

  const getGameboard = () => gameboard;

  const getPlayer = () => {
    const currentPlayer = players[count];
    return currentPlayer;
  };
  const boardNotFull = () => gameboard.some((val) => val === "");

  const setTile = (mark, index) => {
    if (!gameboard[index]) {
      gameboard[index] = mark;
      count = (count + 1) % 2;
    }
    if (!boardNotFull()) {
      draw = true;
    }
  };

  const checkWinner = (mark) => {
    let win = false;
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
      const playerCombo = combo.map((index) => gameboard[index]);
      const winner = playerCombo.every((val) => val === mark);
      if (winner) {
        win = true;
        return;
      }
    });

    return win;
  };

  const checkDraw = () => draw;

  return { getPlayer, getGameboard, setTile, checkWinner, checkDraw };
})();

const displayController = (() => {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const currentPlayer = grid.getPlayer();
      const playerMark = currentPlayer.getMark();
      const tileNumber = getTileNum(tile);
      const board = grid.getGameboard();

      if (board[tileNumber] !== "") {
        return;
      }

      grid.setTile(playerMark, tileNumber);

      gridElement = createMarkElement(playerMark);
      tile.appendChild(gridElement);

      const win = grid.checkWinner(playerMark);
      const draw = grid.checkDraw();

      if (win) {
        winningMessage(playerMark);
        reloadPage();
        return;
      }
      if (draw) {
        drawMessage();
        reloadPage();
        return;
      }
    });
  });
})();

const createMarkElement = (mark) => {
  const element = document.createElement("h1");
  const elementText = document.createTextNode(mark);
  element.appendChild(elementText);
  return element;
};

const winningMessage = (mark) => {
  setTimeout(() => {
    alert(`Congrats, player ${mark} won`);
  }, 200);
};

const drawMessage = () => {
  setTimeout(() => {
    alert("The game is a draw");
  }, 200);
};

const reloadPage = () => {
  setTimeout(() => {
    location.reload();
  }, 2000);
};

const getTileNum = (tile) => {
  const tileId = tile.id;
  const tileNumber = parseInt(tileId.slice(-1));
  return tileNumber;
};
