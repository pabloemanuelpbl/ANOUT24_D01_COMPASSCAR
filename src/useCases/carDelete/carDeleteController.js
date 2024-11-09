const ifTheCarIsRegistered = require("../utils/ifTheCarIsRegistered");

/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import("./carDelete")} carDeleteCallback
 */
function carDeleteController(carDeleteCallback) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  async function handle(request, response) {
    const carId = parseInt(request.params.id);

    const isRegistered = await ifTheCarIsRegistered(carId);
    if (!isRegistered)
      return response.status(404).json({
        errors: ["car not found"],
      });

    try {
      await carDeleteCallback(carId);
      return response.status(204).send();
    } catch {
      return response.status(500).json({
        errors: ["an internal server error occurred"],
      });
    }
  }

  return { handle };
}

module.exports = { carDeleteController };
