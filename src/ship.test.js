const shipFactory = require("./ship");

test("creates ship with proper length", () => {
  const firstShip = shipFactory(5);
  expect(firstShip.shipLength).toBe(5);
});

test("no hit coordinate returns undefined", () => {
  const ship = shipFactory(5);
  expect(ship.hit()).toBe(undefined);
});

test("hits correct part of ship", () => {
  const ship = shipFactory(5);
  ship.hit(2);
  expect(ship.hitLocations).toEqual([ "O", "O", "X", "O", "O" ]);
});

test("isSunk function returns correct boolean", () => {
  const ship = shipFactory(2);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit(1);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit(0);
  expect(ship.isSunk()).toBeTruthy();
});

test("turns ships direction", () => {
  const ship = shipFactory(4);
  ship.toggleDirection();
  expect(ship.direction.isVertical).toBeTruthy();
  ship.toggleDirection();
  expect(ship.direction.isVertical).toBeFalsy();
});
