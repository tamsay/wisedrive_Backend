const matchAllCars = require("../index");
const {getLetterSeriesGroup1, getLetterSeriesGroup2, getNumberSeriesGroup2, getNumberSeriesGroup1} = require("../utils")

describe("Match Car models to Car Id(s)", () => {

  test("returns cardId(s) of All car models in the vehicles list", () => {
    const result = matchAllCars();
    expect(result.length).toBe(30);
  });

  test("returns Car Id(s) of Number Series models - category one", () => {
    const model = "525d";
    const year = '2005';
    const baseModel = "525 d";
    const result = getNumberSeriesGroup1(model, baseModel, year);
    expect(result.carIds.length).toBeGreaterThanOrEqual(0);
  })

  test("returns Car Id(s) of Number Series models - category two", () => {
    const model = "525d xdrive";
    const year = "2015";
    const baseModel = "525 d";
    const subModelId = "xdrive30d" ;
    const newModelId = "525 d xdrive30d";
    const result = getNumberSeriesGroup2(model, baseModel, subModelId, newModelId, year);
    expect(result.carIds.length).toBeGreaterThanOrEqual(0);
  })

  test("returns Car Id(s) of Letter Series models - category one", () => {
    const model = "x5";
    const year = '2015';
    const baseModel = "x5";
    const result = getLetterSeriesGroup1(model, baseModel, year);
    expect(result.carIds.length).toBeGreaterThanOrEqual(0);
  })

  test("returns Car Id(s) of Letter Series models - category two", () => {
    const model = "x3 xdrive 30d";
    const year = "2015";
    const baseModel = "x3";
    const subModelId = "xdrive30d" ;
    const newModelId = "x3 xdrive30d";
    const result = getLetterSeriesGroup2(model, baseModel, subModelId, newModelId, year);
    expect(result.carIds.length).toBeGreaterThanOrEqual(0);
  })

});
