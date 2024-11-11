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

  /**@param {ICar & ICarAltoincrements} [filter={}]   */
  function find(filter = {}) {
    return databaseSession(table).where(filter).select("*");
  }

  /**@param {{id: number} | {plate: string}} filter */
  function findOne(filter) {
    return databaseSession(table).where(filter).first();
  }

  /**@param {ICar & ICarAltoincrements} filter  */
  function deleteWhere(filter) {
    return databaseSession(table).delete().where(filter);
  }

  /**
   * @param {ICar & ICarAltoincrements} filter
   * @param {ICar} update
   */
  function updateWhere(filter, update) {
    return databaseSession(table).update(update).where(filter);
  }

  /**
   * @param {string} [select="*"]
   * @param {string} [whereRaw="id"]
   */
  function count(whereRaw = "id", select = "*") {
    return session("cars")
      .whereRaw(whereRaw)
      .count(select, { as: "count" })
      .then(([result]) => result.count);
  }

  return { save, find, findOne, deleteWhere, updateWhere, count };
}

module.exports = { repositoryCars: repositoryCars(session) };
