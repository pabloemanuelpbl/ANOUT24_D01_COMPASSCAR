const { session } = require("../../knex");
const { request } = require("./testConfig");

let carId;
beforeAll(async () => {
  const [[car]] = await session.raw(
    "SELECT id FROM cars WHERE plate = 'ABC-1D00'"
  );

  carId = car.id;
});

describe("GET /api/v1/cars/:id", () => {
  test("with all the correct data (successfully)", async () => {
    const result = await request.get(`/api/v1/cars/${carId}`);
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("brand");
    expect(result.body).toHaveProperty("model");
    expect(result.body).toHaveProperty("year");
    expect(result.body).toHaveProperty("plate");
    expect(result.body).toHaveProperty("created_at");
    expect(result.body).toHaveProperty("items");
  });

  test("with non-existent id", async () => {
    const result = await request.get(`/api/v1/cars/9999999999999999`);
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("errors");
    expect(result.body.errors[0]).toBe("car not found");
  });
});
