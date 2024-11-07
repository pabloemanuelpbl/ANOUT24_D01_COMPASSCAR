const controllerAlreadyRegistered = require("./controllerCarAlreadyRegistered");
const middlewareCarAlreadyRegistered = require("./middlewareCarAlreadyRegistere");

module.exports = {
  alreadyRegisteredMiddleware: controllerAlreadyRegistered(
    middlewareCarAlreadyRegistered
  ),
};
