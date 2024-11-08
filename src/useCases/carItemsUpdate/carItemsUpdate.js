const { repositoryCarsItems } = require("../../repository/cars_items");

/**
 * @param {string[]} newItems
 * @param {number} carId
 */
async function carItemsUpdate(newItems, carId) {
  await repositoryCarsItems.deleteWhere({ car_id: carId });

  const runingSaves = newItems.map(async (item) => {
    return repositoryCarsItems.save({
      car_id: carId,
      name: item,
    });
  });

  return Promise.all(runingSaves);
}

module.exports = carItemsUpdate;
