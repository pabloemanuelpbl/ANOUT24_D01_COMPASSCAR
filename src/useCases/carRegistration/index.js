const carRegistration = require("./carRegistration");
const carRegistrationContoller = require("./carRegistrationController");
const { carRegistrationErrorHandle } = require("./carRegistrationErrorHandler");

module.exports = {
  carRegistrationContoller: carRegistrationContoller(
    carRegistration,
    carRegistrationErrorHandle
  ),
};
