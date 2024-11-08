const { repositoryCarsItems } = require("./cars_items");

test("ooo", async () => {
  await repositoryCarsItems.findOne(3, "name").then((result) => {
    const items = result.map((item) => item.name);
    console.log(items);
  });
});

test("bbb", () => {
  return repositoryCarsItems
    .save({ car_id: 3, name: "testtooo" })
    .then((resId) => {
      console.log(resId);
    });
});
