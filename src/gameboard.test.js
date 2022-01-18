const gameBoard = require("./gameboard");
const shipFactory = require("./ship");
const player = require("./player");

test("places horizontal ship at correct coordinates", () => {
  const initBoard = gameBoard();
  const battleship = shipFactory(4);
  initBoard.placeShip(battleship, 3);
  expect(initBoard.boardInfo.board[3 - 1].shipName).toBe(battleship);
  expect(initBoard.boardInfo.board[4 - 1].shipName).toBe(battleship);
  expect(initBoard.boardInfo.board[5 - 1].shipName).toBe(battleship);
  expect(initBoard.boardInfo.board[6 - 1].shipName).toBe(battleship);
  expect(initBoard.boardInfo.board[7 - 1].shipName).toBeUndefined();
});

test("places vertical ship at correct coordinates", () => {
  const initBoard = gameBoard();
  const ship = shipFactory(4);
  ship.toggleDirection();
  initBoard.placeShip(ship, 55);
  expect(initBoard.boardInfo.board[55 - 1].shipName).toBe(ship);
  expect(initBoard.boardInfo.board[65 - 1].shipName).toBe(ship);
  expect(initBoard.boardInfo.board[75 - 1].shipName).toBe(ship);
  expect(initBoard.boardInfo.board[85 - 1].shipName).toBe(ship);
  expect(initBoard.boardInfo.board[95 - 1].shipName).toBeUndefined();
});

test("won't place ships off of map", () => {
  const initBoard = gameBoard();
  const battleship = shipFactory(2);
  // battleship.toggleDirection();
  expect(initBoard.placeShip(battleship, 60)).toBe(
    "Can't place ship there"
  );
});

test("won't place two ships in same spot", () => {
  const initBoard = gameBoard();
  const battleship = shipFactory(4);
  const carrier = shipFactory(6);
  battleship.toggleDirection();
  carrier.toggleDirection();
  initBoard.placeShip(battleship, 3);
  expect(initBoard.placeShip(battleship, 33)).toBe(
    "Can't place ship there"
  );
  initBoard.placeShip(carrier, 5);
  expect(initBoard.boardInfo.board[7].shipName).toBeUndefined();
});

test("receives attack at correct ship position", () => {
  const initBoard = gameBoard();
  const ai = player(false, "CPU");
  const battleship = shipFactory(3);
  initBoard.placeShip(battleship, 3);
  initBoard.receiveAttack(4, ai);
  expect(initBoard.boardInfo.board[4 - 1].beenHit).toBeTruthy();
  expect(battleship.hitLocations).toEqual([ "O", "X", "O" ]);
});

test("receiveAttack doesn't hit same spot twice", () => {
  const initBoard = gameBoard();
  const ai = player(false, "CPU");
  initBoard.receiveAttack(3, ai);
  expect(initBoard.receiveAttack(3, ai)).toBe("Invalid spot");
});

test("receiveAttack records missed shots", () => {
  const initBoard = gameBoard();
  const ai = player(false, "CPU");
  initBoard.receiveAttack(4, ai);
  expect(initBoard.boardInfo.board[4 - 1].missedAttack).toBeTruthy();
});

test("returns true when all ships are sunk ", () => {
  const initBoard = gameBoard();
  const battleship = shipFactory(3);
  const carrier = shipFactory(2);
  const ai = player(false, "CPU");
  initBoard.placeShip(battleship, 4);
  initBoard.placeShip(carrier, 60);
  initBoard.receiveAttack(4, ai);
  initBoard.receiveAttack(5, ai);
  initBoard.receiveAttack(6, ai);
  initBoard.receiveAttack(60, ai);
  initBoard.receiveAttack(65, ai);
  expect(initBoard.isGameOver()).toBeTruthy();
});
