const { repositoryCars } = require("../../repository/cars");
const carAlreadyRegistered = require("../utils/carPlateAlreadyRegistered");

/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import("./carUpdate")} carUpdatecallback
 * @param {import("./carUpdateErrorHandle")} carUpdateErrorHandle
 */
function carUpdateController(carUpdateCallback, carUpdateErrorHandle) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  async function handle(request, response) {
    try {
      const id = parseInt(request.params.id);

      const errors = carUpdateErrorHandle(request.body);
      if (errors.length > 0) return response.status(400).json({ errors });

      const carIsRegistered = await repositoryCars.findOne({ id });

      if (!carIsRegistered)
        return response.status(404).json({
          errors: ["car not found"],
        });

      if (request.body.plate && request.body.plate !== carIsRegistered.plate) {
        const plateIsRegistered = await carAlreadyRegistered(
          request.body.plate
        );
        if (plateIsRegistered)
          return response.status(409).json({
            errors: ["car already registered"],
          });
      }

      await carUpdateCallback(id, request.body);
      return response.status(204).send();
    } catch {
      return response.status(500).json({
        errors: ["an internal server error occurred"],
      });
    }
  }

  return { handle };
}

module.exports = { carUpdateController };
