/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 * @typedef {import('express').NextFunction} Next
 */

/** @param {import('./middlewareCarAlreadyRegistere')} carAlreadyRegisteredCallback */
function controllerAlreadyRegistered(carAlreadyRegisteredCallback) {
  /**
   * @param {Request} request
   * @param {Response} response
   * @param {Next} next
   */
  async function handle(request, response, next) {
    try {
      const { plate } = request.body;

      const isAlreadRegistered = await carAlreadyRegisteredCallback(plate);

      if (isAlreadRegistered) {
        return response.status(409).json({ error: ["car already registered"] });
      }

      next();
    } catch {
      return response
        .status(500)
        .json({ errors: ["an internal server error occurred"] });
    }
  }

  return { handle };
}

module.exports = controllerAlreadyRegistered;
