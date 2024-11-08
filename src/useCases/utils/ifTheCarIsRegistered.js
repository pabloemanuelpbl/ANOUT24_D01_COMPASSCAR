const { repositoryCars } = require("../../repository/cars");

/**
 * @param {number} carId
 * @returns {boolean}
 */
async function ifTheCarIsRegistered(carId) {
  const result = await repositoryCars.findOne({ id: carId });

  if (result) return true;
  return false;
}

module.exports = ifTheCarIsRegistered;
