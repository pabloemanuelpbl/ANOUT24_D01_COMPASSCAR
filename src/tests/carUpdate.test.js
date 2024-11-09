const { repositoryCars } = require("../repository/cars");
const { request } = require("./testConfig");

let carId;
beforeAll(() => {
  return repositoryCars
    .findOne({ plate: "ABC-1D06" })
    .then((result) => (carId = result.id))
    .catch(async () => {
      const [id] = await repositoryCars.save({
        brand: "car update test",
        model: "car update test",
        plate: "ABC-1D06",
        year: 2020,
      });

      carId = id;
    });
});

describe("PATCH /api/v1/cars/:id", () => {
  test("with all the correct data (successfully)", async () => {
    const result = await request.patch(`/api/v1/cars/${carId}`).send({
      brand: "changed",
      model: "changed",
      year: 2022,
      plate: "ABC-1D16",
    });

    expect(result.status).toBe(204);
    expect(Object.keys(result.body).length).toBe(0);
  });

  test("must have changed the data", async () => {
    const carState = await repositoryCars.findOne({ id: carId });
    expect(carState.brand).toBe("changed");
    expect(carState.model).toBe("changed");
    expect(carState.year).toBe(2022);
    expect(carState.plate).toBe("ABC-1D16");

    //return plate value
    repositoryCars.updateWhere(
      { id: carId },
      {
        brand: "changed",
        model: "changed",
        year: 2022,
        plate: "ABC-1D16",
      }
    );
  });
});
