const carItemsUpdate = require("./carItemsUpdate");
const carItemsUpdateController = require("./carItemsUpdateController");
const carItemsUpdateErrorHandle = require("./carItemsUpdateErrorHandle");

module.exports = {
  carItemsUpdateController: carItemsUpdateController(
    carItemsUpdate,
    carItemsUpdateErrorHandle
  ),
};
