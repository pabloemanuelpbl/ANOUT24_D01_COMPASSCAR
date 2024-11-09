const { Router } = require("express");
const { carRegistrationContoller } = require("./useCases/carRegistration");
const { carItemsUpdateController } = require("./useCases/carItemsUpdate");
const { carFindController } = require("./useCases/carFind");
const { carDeleteController } = require("./useCases/carDelete/");

const router = Router();

router.post("/api/v1/cars", carRegistrationContoller.handle);
router.put("/api/v1/cars/:id/items", carItemsUpdateController.handle);
router.get("/api/v1/cars/:id", carFindController.handle);
router.delete("/api/v1/cars/:id", carDeleteController.handle);

module.exports = { router };
