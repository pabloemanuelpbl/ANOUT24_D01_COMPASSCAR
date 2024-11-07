const { Router } = require("express");
const { carRegistrationContoller } = require("./useCases/carRegistration");
const { alreadyRegisteredMiddleware } = require("./middleware");

const router = Router();

router.post(
  "/api/v1/cars",
  alreadyRegisteredMiddleware.handle,
  carRegistrationContoller.handle
);

module.exports = { router };
