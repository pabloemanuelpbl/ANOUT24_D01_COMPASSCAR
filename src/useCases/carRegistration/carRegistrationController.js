const carAlreadyRegistered = require("./carAlreadyRegistered");

/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import('./carRegistration')} carRegistrationCallback
 * @param {import('./carRegistrationErrorHandler').carRegistrationErrorHandle} carErrorHandlerCallback
 * @returns {{handle: Response}}
 */
function carRegistrationContoller(
  carRegistrationCallback,
  carErrorHandlerCallback
) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  async function handle(request, response) {
    const errors = carErrorHandlerCallback(request.body);

    if (errors.length > 0) return response.status(400).json({ errors });

    const alreadyRegistered = await carAlreadyRegistered(request.body.plate);
    if (alreadyRegistered)
      return response.status(409).json({ errors: ["car already registered"] });

    carRegistrationCallback(request.body)
      .then((result) => {
        return response.status(201).json(result);
      })
      .catch(() => {
        return response.status(500).json({
          errors: ["an internal server error occurred"],
        });
      });
  }

  return { handle };
}

module.exports = carRegistrationContoller;
