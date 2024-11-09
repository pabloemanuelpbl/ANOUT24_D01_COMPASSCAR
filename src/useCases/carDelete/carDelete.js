const { repositoryCars } = require("../../repository/cars");
const { repositoryCarsItems } = require("../../repository/cars_items");

/**
 * @param {number} carId
 * @returns {Promise<void>}
 */
async function carDelete(carId) {
  return (
    await repositoryCarsItems.deleteWhere({ car_id: carId }),
    await repositoryCars.deleteWhere({ id: carId })
  );
}

module.exports = carDelete;
