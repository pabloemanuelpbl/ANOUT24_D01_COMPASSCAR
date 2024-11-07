const { Router } = require("express");
const { carRegistrationContoller } = require("./useCases/carRegistration");

const router = Router();

router.post("/api/v1/cars", carRegistrationContoller.handle);

module.exports = { router };
