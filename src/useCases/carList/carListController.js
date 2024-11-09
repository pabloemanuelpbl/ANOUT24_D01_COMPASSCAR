/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import("./carList")} carListCallback
 */
function carListController(carListCallback) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  async function handle(request, response) {
    try {
      await carListCallback();
      return response.status(200).send();
    } catch {
      return response.status(500).json({
        errors: ["an internal server error occurred"],
      });
    }
  }

  return { handle };
}

module.exports = { carListController };
