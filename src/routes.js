const { Router } = require("express");
const { carRegistrationContoller } = require("./useCases/carRegistration");
const { carItemsUpdateController } = require("./useCases/carItemsUpdate");

const router = Router();

router.post("/api/v1/cars", carRegistrationContoller.handle);
router.put("/api/v1/cars/:id/items", carItemsUpdateController.handle);

module.exports = { router };
