/**
 * @typedef {import("./carList").Select} Select
 *
 * @param {Select} filter
 * @returns {[string, string]}
 */
function queryGenerator(filter) {
  if (filter.page < 1) filter.page = 1;
  const limit = filter.limit || 5;
  const page = (filter.page - 1) * limit || 0;

  let query = [];
  let queryPagination = [];

  if (filter.year) query.push("year >= " + filter.year);
  if (filter.final_plate) query.push(`plate LIKE "%${filter.final_plate}"`);
  if (filter.brand) query.push(`brand LIKE "%${filter.brand}%"`);

  queryPagination.push(`LIMIT ${limit}`);
  queryPagination.push(`OFFSET ${page}`);

  if (query.length === 0) return ["id", " " + queryPagination.join(" ")];
  return [query.join(" AND "), " " + queryPagination.join(" ")];
}

module.exports = queryGenerator;
