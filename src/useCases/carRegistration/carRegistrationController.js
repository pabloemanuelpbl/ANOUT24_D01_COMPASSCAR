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
  function handle(request, response) {
    const errors = carErrorHandlerCallback(request.body);

    if (errors.length > 0) return response.status(400).json({ errors });

    carRegistrationCallback(request.body)
      .then(() => {
        return response.status(204).json();
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
