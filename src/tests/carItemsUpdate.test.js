const { session } = require("../../knex");
const { request } = require("./testConfig");

let carId;
beforeAll(async () => {
  const [[car]] = await session.raw(
    "SELECT id FROM cars WHERE plate = 'ABC-1D00'"
  );

  carId = car.id;
});

describe("PUT /api/v1/cars/:id/items", () => {
  test("with all the correct data (successfully)", async () => {
    const result = await request
      .put(`/api/v1/cars/${carId}/items`)
      .send(["Ar condicionado", "Trava Eletrica", "Vidro Eletrico"]);

    expect(result.status).toBe(204);
  });

  test("with missing data", async () => {
    const result = await request.put(`/api/v1/cars/${carId}/items`).send([]);

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("items is required");
  });

  test("with the limit of 5 items exceeded", async () => {
    const result = await request
      .put(`/api/v1/cars/${carId}/items`)
      .send(["item1", "item2", "item3", "item4", "item5", "item6"]);

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("items must be a maximum of 5");
  });

  test("with repeated items", async () => {
    const result = await request
      .put(`/api/v1/cars/${carId}/items`)
      .send(["repeat", "repeat", "repeat", "repeat", "repeat"]);

    expect(result.status).toBe(400);
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("items cannot be repeated");
  });

  test("with unregistered car", async () => {
    const result = await request
      .put(`/api/v1/cars/99/items`)
      .send(["Ar condicionado", "Trava Eletrica", "Vidro Eletrico"]);

    expect(result.status).toBe(404);
    //expect(result.body.errors.length).toBe(1);
    //expect(result.body.errors[0]).toBe("car not found");
  });
});
