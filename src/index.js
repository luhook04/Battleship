const gameBoard = require("./gameboard");
const shipFactory = require("./ship");
const player = require("./player");

// create player ships
const carrier = shipFactory(5);
const battleship = shipFactory(4);
const destroyer = shipFactory(3);
const submarine = shipFactory(3);
const patrolBoat = shipFactory(2);

// create ai ships
const aiCarrier = shipFactory(5);
const aiBattleship = shipFactory(4);
const aiDestroyer = shipFactory(3);
const aiSubmarine = shipFactory(3);
const aiPatrolBoat = shipFactory(2);

// create player and CPU gameboard
let playerBoard = gameBoard();
let aiBoard = gameBoard();

// create players
const player1 = player(true, "Luke");
const ai = player(false, "CPU");

const ships = document.querySelectorAll(".ship");
const battleshipHTML = document.querySelector("#battleship");
const carrierHTML = document.querySelector("#carrier");
const submarineHTML = document.querySelector("#submarine");
const destroyerHTML = document.querySelector("#destroyer");
const patrolBoatHTML = document.querySelector("#patrol-boat");
const addShips = document.querySelector(".add-ships");
const aiSide = document.querySelector("#ai-board-container");
const endGameModal = document.querySelector("#endGameModal");
const playAgainButton = document.querySelector("#playAgainButton");
const winnerText = document.querySelector("#winnerText");

//method to make ships draggable
const dragShip = (element) => {
  element.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
};

// make ships draggable
dragShip(battleshipHTML);
dragShip(carrierHTML);
dragShip(submarineHTML);
dragShip(destroyerHTML);
dragShip(patrolBoatHTML);

// // randomly place ai ships
aiBoard.placeAIShip(aiBattleship);
aiBoard.placeAIShip(aiCarrier);
aiBoard.placeAIShip(aiDestroyer);
aiBoard.placeAIShip(aiSubmarine);
aiBoard.placeAIShip(aiPatrolBoat);

// // method that creates the gameboard html
const createBoard = (boardName) => {
  let boardClass = document.querySelector(`.${boardName}`);
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", i + 1);
    if (boardName === "aiBoard") {
      cell.addEventListener("click", (e) => {
        attackEvent(e.target);
      });
    }
    else if (boardName === "playerBoard") {
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        dropShip(e);
      });
    }
    boardClass.appendChild(cell);
  }
};

createBoard("aiBoard");
createBoard("playerBoard");

// send the attack method to the correct place
const attackEvent = (e) => {
  let coord = e.getAttribute("id");
  player1.attack(coord, aiBoard, ai);
  updateDisplay("aiBoard", aiBoard);
  e.style.pointerEvents = "none";
  if (aiBoard.isGameOver()) {
    endGame(player1.playerInfo.playerName);
  }
  ai.cpuAttack(playerBoard, player1);
  updateDisplay("playerBoard", playerBoard);
  if (playerBoard.isGameOver()) {
    endGame("CPU");
  }
};

// updates the display to mark game progress
const updateDisplay = (boardName, gBoard) => {
  let cellSelection = document.querySelectorAll(`.${boardName} .cell`);
  gBoard.boardInfo.board.forEach((cell) => {
    if (cell.shipName && cell.beenHit) {
      let selectedCell = cellSelection[`${cell.id}`];
      selectedCell.textContent = "X";
      selectedCell.classList.add("hit");
      selectedCell.classList.remove("occupied");
    }
    else if (
      cell.shipName &&
      boardName === "playerBoard" &&
      !cell.beenHit
    ) {
      let selectedCell = cellSelection[`${cell.id}`];
      selectedCell.classList.add("occupied");
    }
    gBoard.boardInfo.missedAttacks.forEach((attack) => {
      let selectedCell = cellSelection[`${attack}`];
      selectedCell.classList.add("missed");
      selectedCell.textContent = "Miss";
    });
  });
};

// method to drop ship on gameboard
const dropShip = (e) => {
  let data = e.dataTransfer.getData("text");
  let coord = parseInt(e.target.getAttribute("id"));
  switch (data) {
    case "battleship":
      if (playerBoard.checkShipPlacement(battleship, coord)) {
        playerBoard.placeShip(battleship, coord);
        updateDisplay("playerBoard", playerBoard);
        addShips.removeChild(document.querySelector(`#${data}`));
        if (addShips.children.length === 0) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "carrier":
      if (playerBoard.checkShipPlacement(carrier, coord)) {
        playerBoard.placeShip(carrier, coord);
        updateDisplay("playerBoard", playerBoard);
        addShips.removeChild(document.querySelector(`#${data}`));
        if (addShips.children.length === 0) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "submarine":
      if (playerBoard.checkShipPlacement(submarine, coord)) {
        playerBoard.placeShip(submarine, coord);
        updateDisplay("playerBoard", playerBoard);
        addShips.removeChild(document.querySelector(`#${data}`));
        if (addShips.children.length === 0) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "destroyer":
      if (playerBoard.checkShipPlacement(destroyer, coord)) {
        playerBoard.placeShip(destroyer, coord);
        updateDisplay("playerBoard", playerBoard);
        addShips.removeChild(document.querySelector(`#${data}`));
        if (addShips.children.length === 0) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "patrol-boat":
      if (playerBoard.checkShipPlacement(patrolBoat, coord)) {
        playerBoard.placeShip(patrolBoat, coord);
        updateDisplay("playerBoard", playerBoard);
        addShips.removeChild(document.querySelector(`#${data}`));
        if (addShips.children.length === 0) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
  }
};
// changes ship direction
// const changeDirection = (e) => {
//   const shipName = e.target.id;
//   shipName.toggleDirection();
// };

// // makes each ship direction change on dbl click
// ships.forEach((ship) => {
//   ship.addEventListener("dblclick", changeDirection(e));
// });

// reloads game
playAgainButton.addEventListener("click", function() {
  location.reload();
});

// shows who the winner is after game is over
const endGame = (winner) => {
  endGameModal.style.display = "block";
  winnerText.textContent = `${winner} is the winner!!`;
};
