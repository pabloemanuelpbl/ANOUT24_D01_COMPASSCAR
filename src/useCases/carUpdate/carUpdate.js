/** @typedef {{brand: string, model: string, year: number, plate: string}} ICar */

const { repositoryCars } = require("../../repository/cars");

/**
 * @param {number} carId
 * @param {ICar} newCarUpdate
 */
function carUpdate(carId, newCarUpdate) {
  return repositoryCars.updateWhere({ id: carId }, newCarUpdate);
}

module.exports = carUpdate;
