/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import("./carDelete")} carDeleteCallback
 * @returns {{handle: Response}}
 */
function carDeleteController(carDeleteCallback) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  function handle(request, response) {
    return response.status(204).json();
  }

  return { handle };
}

module.exports = { carDeleteController };
