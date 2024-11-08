const ifTheCarIsRegistered = require("../utils/ifTheCarIsRegistered");

/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import('./carItemsUpdate')} carItemsUpdateCallback
 * @param {import('./carItemsUpdateErrorHandle')} carItemsUpdateErrorHandleCallback
 * @returns {{handle: Response}}
 */
function carItemsUpdateController(
  carItemsUpdateCallback,
  carItemsUpdateErrorHandleCallback
) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  async function handle(request, response) {
    const id = parseInt(request.params.id);

    const errors = carItemsUpdateErrorHandleCallback(request.body);

    if (errors.length > 0) return response.status(400).json({ errors });

    const isRegistered = await ifTheCarIsRegistered(id);
    if (!isRegistered) {
      return response.status(404).json({
        errors: ["car not found"],
      });
    }

    return carItemsUpdateCallback(request.body, id)
      .then(() => response.status(204).json())
      .catch(() =>
        response.status(500).json({
          errors: ["an internal server error occurred"],
        })
      );
  }

  return { handle };
}

module.exports = carItemsUpdateController;
