const matchAllCars = require("../index");

describe("Match Car models to respective CarIds", () => {

  test("returns cardId(s) of specified model", () => {
    const result = matchAllCars();
    expect(result.length).toBe(30);
  });
});
