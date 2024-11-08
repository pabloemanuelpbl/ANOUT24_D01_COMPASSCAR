const { session } = require("../../knex");
const { request } = require("./testConfig");

beforeAll(async () => {
  try {
    const [[car]] = await session.raw(
      "SELECT id FROM cars WHERE plate = 'ABC-1D00'"
    );
    await session.raw(`DELETE FROM cars_items WHERE car_id = ${car.id}`);
    await session.raw(`DELETE FROM cars WHERE id = ${car.id}`);
  } catch {
    return;
  }
});

describe("POST /api/v1/cars", () => {
  test("with all the correct data (successfully)", async () => {
    const result = await request.post("/api/v1/cars").send({
      brand: "Marca",
      model: "Modelo",
      year: 2018,
      plate: "ABC-1D00",
    });
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("brand");
    expect(result.body).toHaveProperty("model");
    expect(result.body).toHaveProperty("year");
    expect(result.body).toHaveProperty("plate");
    expect(result.body).toHaveProperty("created_at");
  });

  test("with missing data", async () => {
    const result = await request.post("/api/v1/cars").send({
      //brand: "Marca",
      //model: "Modelo",
      //year: 2018,
      //plate: "ABC-1D23",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(4);
    expect(result.body.errors[0]).toBe("brand is required");
    expect(result.body.errors[1]).toBe("model is required");
    expect(result.body.errors[2]).toBe("year is required");
    expect(result.body.errors[3]).toBe("plate is required");
  });

  test("with a year below the required", async () => {
    const result = await request.post("/api/v1/cars").send({
      brand: "debug",
      model: "Modelo",
      year: 2010,
      plate: "ACC-1C34",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("year must be between 2015 and 2025");
  });

  test("with the year above the required", async () => {
    const result = await request.post("/api/v1/cars").send({
      brand: "Marca",
      model: "Modelo",
      year: 2030,
      plate: "ABC-1D20",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("year must be between 2015 and 2025");
  });

  test("with invalid plate format", async () => {
    const result = await request.post("/api/v1/cars").send({
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

  test("with license plate already registered", async () => {
    const result = await request.post("/api/v1/cars").send({
      brand: "Marca",
      model: "Modelo",
      year: 2018,
      plate: "ABC-1D00",
    });

    expect(result.status).toBe(409);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("car already registered");
  });
});
