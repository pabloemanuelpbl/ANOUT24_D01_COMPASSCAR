/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 *
 * @param {import('./carItemsUpdate')} carItemsUpdateCallback
 * @returns {{handle: Response}}
 */
function carItemsUpdateController(carItemsUpdateCallback) {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  function handle(request, response) {
    const id = request.params.id;
    const body = request.body;

    return carItemsUpdateCallback(body, id)
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
