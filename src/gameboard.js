const gameBoard = () => {
  // boardInfo object containing the board array and shipsLeft Boolean
  const boardInfo = {
    board         : [],
    shipsLeft     : true,
    missedAttacks : []
  };

  // pushes an object into each board array index
  const fillBoard = () => {
    for (let i = 0; i < 100; i++) {
      boardInfo.board.push({
        shipName     : undefined,
        shipIndex    : undefined,
        beenHit      : false,
        missedAttack : false,
        id           : i
      });
    }
  };

  // initializes board array, if it hasn't already
  if (boardInfo.board.length === 0) fillBoard();

  // checks if a ship placement will fit in the board
  const checkOverflow = (ship, coord) => {
    if (
      coord % 10 === 0 &&
      ship.direction.isVertical === false &&
      ship.getShipLength() > 1
    ) {
      return true;
    }
    else if (
      ship.direction.isVertical === false &&
      coord % 10 + ship.getShipLength() > 11
    ) {
      return true;
    }
    else if (
      ship.direction.isVertical === true &&
      coord + ship.getShipLength() * 10 > 110
    ) {
      return true;
    }
    else return false;
  };

  // checks if a ship is already placed at the coords
  const isSpotTaken = (ship, coord) => {
    if (ship.direction.isVertical === false) {
      for (let i = 0; i < ship.getShipLength(); i++) {
        if (boardInfo.board[coord - 1 + i].shipName !== undefined) {
          return true;
        }
      }
    }
    else if (ship.direction.isVertical) {
      for (let i = 0; i < ship.getShipLength(); i++) {
        if (boardInfo.board[coord - 1 + i * 10].shipName !== undefined) {
          return true;
        }
      }
    }
    else return false;
  };

  // checks if ship placement is valid
  const checkShipPlacement = (ship, coord) => {
    if (isSpotTaken(ship, coord) || checkOverflow(ship, coord))
      return false;
    else return true;
  };

  // takes coordinate and places ship in correct spot
  const placeShip = (ship, coord) => {
    if (isSpotTaken(ship, coord) || checkOverflow(ship, coord))
      return "Can't place ship there";
    else if (ship.direction.isVertical) {
      for (let i = 0; i < ship.getShipLength(); i++) {
        boardInfo.board[coord - 1 + i * 10].shipName = ship;
        boardInfo.board[coord - 1 + i * 10].shipIndex = i;
      }
    }
    else {
      for (let i = 0; i < ship.getShipLength(); i++) {
        boardInfo.board[coord - 1 + i].shipName = ship;
        boardInfo.board[coord - 1 + i].shipIndex = i;
      }
    }
  };

  // takes coordinate and places ship in correct spot
  const placeAIShip = (ship) => {
    let coord = Math.floor(Math.random() * 95 + 1);
    if (checkShipPlacement(ship, coord)) {
      if (ship.direction.isVertical) {
        for (let i = 0; i < ship.getShipLength(); i++) {
          boardInfo.board[coord - 1 + i * 10].shipName = ship;
          boardInfo.board[coord - 1 + i * 10].shipIndex = i;
        }
      }
      else {
        for (let i = 0; i < ship.getShipLength(); i++) {
          boardInfo.board[coord - 1 + i].shipName = ship;
          boardInfo.board[coord - 1 + i].shipIndex = i;
        }
      }
    }
    else placeAIShip(ship);
  };

  const randomCoord = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

  // receives an attack and sends either a hit marker or missed attack marker to the correct position
  const receiveAttack = (coord) => {
    if (boardInfo.board[coord - 1].beenHit === true) {
      let newCoord = randomCoord();
      receiveAttack(newCoord);
    }
    else if (boardInfo.board[coord - 1].shipName !== undefined) {
      boardInfo.board[coord - 1].beenHit = true;
      boardInfo.board[coord - 1].shipName.hit(
        boardInfo.board[coord - 1].shipIndex
      );
    }
    else {
      boardInfo.board[coord - 1].beenHit = true;
      boardInfo.board[coord - 1].missedAttack = true;
      boardInfo.missedAttacks.push(coord - 1);
    }
  };

  // checks if all ships on gameboard are sunk
  const isGameOver = () => {
    for (let cell of boardInfo.board) {
      if (cell.shipName !== undefined && !cell.beenHit) return false;
    }
    return true;
  };

  return {
    placeShip,
    boardInfo,
    receiveAttack,
    isGameOver,
    placeAIShip,
    checkShipPlacement
  };
};

module.exports = gameBoard;
