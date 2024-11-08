const { repositoryCars } = require("../../repository/cars");
const { repositoryCarsItems } = require("../../repository/cars_items");

/**
 * @param {number} carId
 * @returns {object}
 */
async function carFind(carId) {
  const car = await repositoryCars.findOne({ id: carId });
  if (!car) return;

  const car_items = await repositoryCarsItems.find(carId);

  const items = car_items.map((item) => item.name);

  return { ...car, items };
}

module.exports = carFind;
