const { session } = require("../../knex");
/** @typedef {{name: string, car_id: }} ICarItems */
/** @typedef {{id: string, created_at: Date}} ICarItemsAltoincrements */
/** @param {import('knex').Knex} databaseSession*/
function repositoryCarsItems(databaseSession) {
  const table = "cars_items";

  /** @param {ICarItems} newItem  */
  function save(newItem) {
    return databaseSession(table).insert({
      name: newItem.name,
      car_id: newItem.car_id,
    });
  }

  /**
   * @param {id: number} carId
   * @param {string} [select="*"]
   */
  function find(carId, select = "*") {
    return databaseSession(table)
      .join("cars", "cars_items.car_id", "cars.id")
      .select(select)
      .where({ "cars.id": carId });
  }

  /** @param {{car_id: number}|{id: number}} filter */
  function deleteWhere(filter) {
    return databaseSession(table).delete().where(filter);
  }

  return { deleteWhere, find, save };
}

module.exports = { repositoryCarsItems: repositoryCarsItems(session) };
