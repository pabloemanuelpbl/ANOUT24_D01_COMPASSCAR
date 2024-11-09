const { repositoryCars } = require("../repository/cars");
const { request } = require("./testConfig");

let carId;
beforeAll(async () => {
  await repositoryCars.deleteWhere({ plate: "ABC-1D16" });
  await repositoryCars
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

  const car2 = await repositoryCars.findOne({ plate: "ABC-1D26" });
  if (!car2) {
    return repositoryCars.save({
      brand: "car update test2",
      model: "car update test2",
      plate: "ABC-1D26",
      year: 2020,
    });
  }
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
  });

  test("when the plate exists", async () => {
    const result = await request.patch(`/api/v1/cars/${carId}`).send({
      brand: "changed",
      model: "changed",
      year: 2022,
      plate: "ABC-1D26",
    });

    expect(result.status).toBe(409);
    expect(result.body).toHaveProperty("errors");
    expect(result.body.errors[0]).toBe("car already registered");
  });

  test("with invalid plate format", async () => {
    const result = await request.patch(`/api/v1/cars/${carId}`).send({
      brand: "Marca",
      model: "Modelo",
      year: 2018,
      plate: "AAA-AAAA0",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe(
      "plate must be in the correct format ABC-1C34"
    );
  });

  test("with the year above the required", async () => {
    const result = await request.patch(`/api/v1/cars/${carId}`).send({
      brand: "Marca",
      model: "Modelo",
      year: 2030,
      plate: "ABC-1D16",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("year must be between 2015 and 2025");
  });

  test("with a year below the required", async () => {
    const result = await request.patch(`/api/v1/cars/${carId}`).send({
      brand: "debug",
      model: "Modelo",
      year: 2010,
      plate: "ABC-1D16",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("year must be between 2015 and 2025");
  });

  test("when the brand is sent and the model is not", async () => {
    const result = await request.patch(`/api/v1/cars/${carId}`).send({
      brand: "debug",
      //model: "Modelo",
      //year: 2010,
      //plate: "ABC-1D16",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("model must also be informed");
  });

  test("when car id is not found", async () => {
    const result = await request.patch("/api/v1/cars/9999999999999999").send({
      brand: "debug",
      model: "Modelo",
      //year: 2010,
      //plate: "ABC-1D16",
    });

    expect(result.status).toBe(404);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("car not found");
  });
});
