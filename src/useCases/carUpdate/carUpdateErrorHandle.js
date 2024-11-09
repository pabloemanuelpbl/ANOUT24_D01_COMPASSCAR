const carPlateRegex = require("../utils/carPlateRegex");
/** @typedef {import("./carUpdate").ICar} ICar */

/** @param {ICar} newCarUpdate  */
function carUpdateErrorHandle(newCarUpdate) {
  let errors = [];

  if (newCarUpdate.brand && !newCarUpdate.model)
    errors.push("model must also be informed");

  if (newCarUpdate.plate && !carPlateRegex(newCarUpdate.plate))
    errors.push("plate must be in the correct format ABC-1C34");

  if (
    newCarUpdate.year &&
    (newCarUpdate.year < 2015 || newCarUpdate.year > 2025)
  ) {
    errors.push("year must be between 2015 and 2025");
  }

  return errors;
}

module.exports = carUpdateErrorHandle;
