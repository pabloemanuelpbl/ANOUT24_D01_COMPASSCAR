const carList = require("./carList");
const { carListController } = require("./carListController");
const queryGenerator = require("./queryGenerator");

module.exports = {
  carListController: carListController(carList, queryGenerator),
};
