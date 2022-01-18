const shipFactory = (shipLength) => {
  // marks the ship as horizontal
  let direction = {
    isVertical : false
  };

  const toggleDirection = () => {
    if (direction.isVertical === false) {
      direction.isVertical = true;
    }
    else {
      direction.isVertical = false;
    }
  };

  // creates an array of undefined as long as the shipLength
  const hitLocations = Array(shipLength).fill("O");

  // method to find a ship's lengths
  const getShipLength = () => shipLength;

  // Marks the hitLocation with an X in the hitLocations array
  const hit = (position) => {
    hitLocations[position] = "X";
  };

  // Checks if all hit locations contain an "X" and returns true if ship is sunk
  const isSunk = () => hitLocations.every((val) => val === "X");

  return {
    shipLength,
    hitLocations,
    hit,
    isSunk,
    getShipLength,
    toggleDirection,
    direction
  };
};

module.exports = shipFactory;
