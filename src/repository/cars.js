const { session } = require("../../knex");

/** @typedef {{brand: string, model: string, year: number, plate: string}} ICar */
/** @typedef {{id: string, created_at: Date}} ICarAltoincrements */

/** @param {import('knex').Knex} databaseSession*/
function repositoryCars(databaseSession) {
  const table = "cars";

  /**@param {ICar} newCar */
  function save(newCar) {
    return databaseSession(table).insert({
      brand: newCar.brand,
      model: newCar.model,
      year: newCar.year,
      plate: newCar.plate,
    });
  }

  /** @param {ICar & ICarAltoincrements} [filter={}]   */
  function find(filter = {}) {
    return databaseSession(table).where(filter).select("*");
  }

  /**@param {{id: number} | {plate: string}} filter */
  function findOne(filter) {
    return databaseSession(table).where(filter).first();
  }

  return { save, find, findOne };
}

module.exports = { repositoryCars: repositoryCars(session) };
