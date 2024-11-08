/**
 * @typedef {import('express').request} Request
 * @typedef {import('express').response} Response
 * @returns {{handle: Response}}
 */
function carUpdateController() {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  function handle(request, response) {
    return response.status(200).send();
  }

  return { handle };
}

module.exports = { carUpdateController };
