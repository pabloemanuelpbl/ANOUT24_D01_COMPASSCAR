const { repositoryCars } = require("../../repository/cars");

/** @typedef {{brand: string, model: string, year: number, plate: string}} ICar */

/** @param {ICar} newCar*/
async function carRegistration(newCar) {
  const [car] = await repositoryCars.save({
    brand: newCar.brand,
    model: newCar.model,
    year: newCar.year,
    plate: newCar.plate,
  });

  return await repositoryCars.findOne({ id: car });
}

module.exports = carRegistration;
