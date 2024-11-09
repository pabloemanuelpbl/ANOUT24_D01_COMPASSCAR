const carUpdate = require("./carUpdate");
const { carUpdateController } = require("./carUpdateController");
const carUpdateErrorHandle = require("./carUpdateErrorHandle");

module.exports = {
  carUpdateController: carUpdateController(carUpdate, carUpdateErrorHandle),
};
