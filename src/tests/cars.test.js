const { session } = require("../../knex");
const { request } = require("./testConfig");

beforeAll(async () => {
  await session("cars").delete().where({ plate: "ABC-1D23" });
});

describe("POST /api/v1/cars", () => {
  test("with all the correct data (successfully)", async () => {
    const result = await request.post("/api/v1/cars").send({
      brand: "Marca",
      model: "Modelo",
      year: 2018,
      plate: "ABC-1D23",
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
    expect(result.body.errors[0]).toBe("brand is required");
    expect(result.body.errors[1]).toBe("model is required");
    expect(result.body.errors[2]).toBe("year is required");
    expect(result.body.errors[3]).toBe("plate is required");
    expect(result.body.errors[4]).toBe(
      "plate must be in the correct format ABC-1C34"
    );
  });

  test("with a year below the required ", async () => {
    const result = await request.post("/api/v1/cars").send({
      brand: "Marca",
      model: "Modelo",
      year: 2010,
      plate: "ABC-1D24",
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

  test("with invalid plate format", async () => {
    const result = await request.post("/api/v1/cars").send({
      brand: "Marca",
      model: "Modelo",
      year: 2018,
      plate: "ABC-1D23",
    });

    expect(result.status).toBe(409);
  });
});
