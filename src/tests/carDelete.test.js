const { repositoryCars } = require("../repository/cars");
const { repositoryCarsItems } = require("../repository/cars_items");
const { request } = require("./testConfig");

let carId;
beforeAll(() => {
  return repositoryCars
    .findOne({ plate: "ABC-1D02" })
    .then((result) => (carId = result.id))
    .catch(async () => {
      const [id] = await repositoryCars.save({
        brand: "car delete test",
        model: "car delete test",
        plate: "ABC-1D02",
        year: 2022,
      });

      await repositoryCarsItems.save({
        car_id: id,
        name: "car item delete test 1",
      });
      await repositoryCarsItems.save({
        car_id: id,
        name: "car item delete test 2",
      });
      await repositoryCarsItems.save({
        car_id: id,
        name: "car item delete test 3",
      });

      carId = id;
    });
});

describe("DELETE /api/v1/cars/:id", () => {
  test("deleting with existing user (successfully)", async () => {
    const result = await request.delete(`/api/v1/cars/${carId}`);
    expect(result.status).toBe(204);
    expect(Object.keys(result.body).length).toBe(0);
  });

  test("whether the deleted car exists", async () => {
    const result = await request.delete(`/api/v1/cars/${carId}`);
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("errors");
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("car not found");
  });

  test("deleting with non-existent user", async () => {
    const result = await request.delete("/api/v1/cars/99999999999");
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("errors");
    expect(result.body.errors.length).toBe(1);
    expect(result.body.errors[0]).toBe("car not found");
  });
});
