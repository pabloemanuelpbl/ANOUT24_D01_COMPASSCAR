/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import('./carFind')} carFindCallback
 * @returns {{handle: Response}}
 */
function carFindController(carFindCallback) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  async function handle(request, response) {
    const id = parseInt(request.params.id);

    const car = await carFindCallback(id);

    if (car) return response.status(200).json(car);

    return response.status(404).json({
      errors: ["car not found"],
    });
  }

  return { handle };
}

module.exports = { carFindController };
