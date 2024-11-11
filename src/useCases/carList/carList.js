const { repositoryCars } = require("../../repository/cars");

/** @typedef {{year: number, final_plate: string, brand: string, page: number, limit: number}} Select */

/**
 * @param {import("knex").Knex.Raw} rawQuery
 * @param {Select} [select={}]
 */
async function carList(rawQuery, select = {}) {
  const result = await repositoryCars.find(select).whereRaw(rawQuery);

  return result;
}

module.exports = carList;
