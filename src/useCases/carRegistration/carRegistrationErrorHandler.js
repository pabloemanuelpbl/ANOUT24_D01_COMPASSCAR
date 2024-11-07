const carPlateRegex = /^[A-Z]{3}-[0-9][A-J,0-9][0-9]{2}$/;

/** @typedef {import("./carRegistration").ICar} ICar */

/** @param {ICar} newCar */
function carRegistrationErrorHandle(newCar) {
  /** @type {string[]} */
  let errors = [];
  if (!newCar.brand) errors.push("brand is required");
  if (!newCar.model) errors.push("model is required");
  if (!newCar.year) errors.push("year is required");
  if (!newCar.plate) errors.push("plate is required");
  if (newCar.year < 2015 || newCar.year > 2025) {
    errors.push("year must be between 2015 and 2025");
  }
  if (newCar.plate && !carPlateRegex.test(newCar.plate))
    errors.push("plate must be in the correct format ABC-1C34");

  return errors;
}

module.exports = { carRegistrationErrorHandle, carPlateRegex };
