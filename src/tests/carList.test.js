const { repositoryCars } = require("../repository/cars");
const { request } = require("./testConfig");

beforeAll(async () => {
  const countResult = await repositoryCars.count('model = "carListTest"');
  if (countResult < 5) {
    await repositoryCars.save({
      brand: "carListTest_hon",
      model: "carListTest",
      year: 2016,
      plate: "CBA-1D01",
    });

    await repositoryCars.save({
      brand: "carListTest_hon",
      model: "carListTest",
      year: 2016,
      plate: "CBA-1D02",
    });

    await repositoryCars.save({
      brand: "carListTest_car",
      model: "carListTest",
      year: 2017,
      plate: "CBA-1D03",
    });

    await repositoryCars.save({
      brand: "carListTest_car",
      model: "carListTest",
      year: 2017,
      plate: "CBA-1D04",
    });

    await repositoryCars.save({
      brand: "carListTest_car",
      model: "carListTest",
      year: 2022,
      plate: "CBA-1D00",
    });
  }
});

describe("GET  /api/v1/cars", () => {
  test("basic request (successfully)", async () => {
    const result = await request.get("/api/v1/cars");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("count");
    expect(result.body).toHaveProperty("pages");
    expect(result.body).toHaveProperty("data");
    expect(Array.isArray(result.body.data)).toBe(true);
  });

  test("with the page parameter equal to 0 (successfully)", async () => {
    const result = await request.get("/api/v1/cars?page=0");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("count");
    expect(result.body).toHaveProperty("pages");
    expect(result.body).toHaveProperty("data");
    expect(Array.isArray(result.body.data)).toBe(true);
  });

  test("with limit and page (successfully)", async () => {
    const result = await request.get("/api/v1/cars?page=1&limit=5");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("count");
    expect(result.body).toHaveProperty("pages");
    expect(result.body).toHaveProperty("data");
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data.length === 5);
  });

  test("with the year parameter (successfully)", async () => {
    const result = await request.get("/api/v1/cars?year=2017");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("count");
    expect(result.body).toHaveProperty("pages");
    expect(result.body).toHaveProperty("data");
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data.length === 3);
  });

  test("with the brand parameter (successfully)", async () => {
    const result = await request.get("/api/v1/cars?brand=hon");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("count");
    expect(result.body).toHaveProperty("pages");
    expect(result.body).toHaveProperty("data");
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data.length === 2);
  });

  test("with the final_plate parameter (successfully)", async () => {
    const result = await request.get("/api/v1/cars?brand=0");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("count");
    expect(result.body).toHaveProperty("pages");
    expect(result.body).toHaveProperty("data");
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data.length === 1);
  });

  test("with non-existent page parameter for page", async () => {
    const result = await request.get("/api/v1/cars?page=999999999999999");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("count");
    expect(result.body).toHaveProperty("pages");
    expect(result.body).toHaveProperty("data");
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data.length === 0);
  });
});
