const carList = require("./carList");
const { carListController } = require("./carListController");

module.exports = { carListController: carListController(carList) };
