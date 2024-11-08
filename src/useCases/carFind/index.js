const carFind = require("./carFind");
const { carFindController } = require("./carFindController");

module.exports = { carFindController: carFindController(carFind) };
