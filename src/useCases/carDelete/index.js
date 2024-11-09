const carDelete = require("./carDelete");
const { carDeleteController } = require("./carDeleteController");

module.exports = { carDeleteController: carDeleteController(carDelete) };
