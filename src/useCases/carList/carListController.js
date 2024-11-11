const { repositoryCars } = require("../../repository/cars");

/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import("./carList")} carListCallback
 * @param {import("./queryGenerator")} queryGeneratorCallback
 */
function carListController(carListCallback, queryGeneratorCallback) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  async function handle(request, response) {
    try {
      const [whereQuery, paginationQuery] = queryGeneratorCallback(
        request.query
      );
      const rawQuery = whereQuery + paginationQuery;
      const list = await carListCallback(rawQuery);
      const count = await repositoryCars.count(whereQuery);

      const output = {
        count: count,
        pages: Math.ceil(count / (request.query.limit || 5)),
        data: list,
      };

      return response.status(200).json(output);
    } catch {
      return response.status(500).json({
        errors: ["an internal server error occurred"],
      });
    }
  }

  return { handle };
}

module.exports = { carListController };
