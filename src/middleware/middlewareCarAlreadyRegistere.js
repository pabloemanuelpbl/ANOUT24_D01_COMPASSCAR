const { repositoryCars } = require("../repository/cars");

/**
 * @param {string} plate
 * @returns {boolean}
 */
async function middlewareCarAlreadyRegistered(plate) {
  const result = await repositoryCars.findOne({ plate });

  if (result) return true;
  return false;
}

module.exports = middlewareCarAlreadyRegistered;
