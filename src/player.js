const player = (turn, name) => {
  let playerInfo = {
    playerTurn : turn,
    playerName : name
  };

  // changes the players turn
  const changeTurn = () => {
    if (playerInfo.playerTurn === false) {
      playerInfo.playerTurn = true;
    }
    else {
      playerInfo.playerTurn = false;
    }
  };

  // checks the player turn
  const checkTurn = () => {
    return playerInfo.playerTurn;
  };

  // sends the receiveAttack function to the enemy gameboard
  const attack = (coord, enemyBoard, attackedPlayer) => {
    if (checkTurn() && playerInfo.playerName !== "CPU") {
      enemyBoard.receiveAttack(coord, attackedPlayer);
      changeTurn();
      attackedPlayer.changeTurn();
    }
  };

  // gets random coordinate
  const randomCoord = () => {
    return Math.floor(Math.random() * 100 + 1);
  };
  ``;
  // takes randomCoord and attacks user board
  const cpuAttack = (userBoard, attackedPlayer) => {
    let coord = randomCoord();
    if (checkTurn() && playerInfo.playerName === "CPU") {
      userBoard.receiveAttack(coord);
      changeTurn();
      attackedPlayer.changeTurn();
    }
  };

  return { changeTurn, playerInfo, checkTurn, attack, cpuAttack };
};

module.exports = player;
