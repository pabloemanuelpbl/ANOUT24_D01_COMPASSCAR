const { repositoryCars } = require("../../repository/cars");

/**
 *
 * @param {string} plate
 * @returns {Promise<boolean>}
 */
async function carAlreadyRegistered(plate) {
  const result = await repositoryCars.findOne({ plate });

  if (result) return true;
  return false;
}

module.exports = carAlreadyRegistered;
