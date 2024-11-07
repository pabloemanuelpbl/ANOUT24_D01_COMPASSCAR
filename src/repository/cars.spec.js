const { repositoryCars } = require("./cars");

test("testing find", async () => {
  const result = await repositoryCars.find({ year: 2018 });

  console.log(result);
});

test("testing findOne", async () => {
  const result = await repositoryCars.findOne({ id: 1 });
  console.log(result);
});
