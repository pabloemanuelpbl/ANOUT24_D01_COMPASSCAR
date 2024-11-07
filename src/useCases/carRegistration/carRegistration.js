const { session } = require("../../../knex");

/** @typedef {{brand: string, model: string, year: number, plate: string}} ICar */

/** @param {ICar} newCar*/
function carRegistration(newCar) {
  return session("cars").insert({
    brand: newCar.brand,
    model: newCar.model,
    year: newCar.year,
    plate: newCar.plate,
  });
}

module.exports = carRegistration;
