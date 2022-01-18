const player = require("./player");
const gameBoard = require("./gameboard");

test("should change user turn", () => {
  const player1 = player(true);
  player1.changeTurn();
  expect(player1.playerInfo.playerTurn).toBeFalsy();
});

test("should send attack to correct gameboard", () => {
  const player1 = player(false, "Luke");
  player1.changeTurn();
  const ai = player(false, "CPU");
  const enemyBoard = gameBoard();
  player1.attack(4, enemyBoard, ai);
  expect(enemyBoard.boardInfo.board[4 - 1].missedAttack).toBeTruthy();
});

test("should send cpu attack to user gameboard", () => {
  const ai = player(false, "CPU");
  const player1 = player(false, "Luke");
  ai.changeTurn();
  const userBoard = gameBoard();
  ai.cpuAttack(userBoard, player1);
  expect(userBoard.boardInfo.missedAttacks.length).toBe(1);
  ai.changeTurn();
  ai.cpuAttack(userBoard, player1);
  expect(userBoard.boardInfo.missedAttacks.length).toBe(2);
});
