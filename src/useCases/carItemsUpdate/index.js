const carItemsUpdate = require("./carItemsUpdate");
const carItemsUpdateController = require("./carItemsUpdateController");

module.exports = {
  carItemsUpdateController: carItemsUpdateController(carItemsUpdate),
};
