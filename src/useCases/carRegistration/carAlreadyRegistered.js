const { repositoryCars } = require("../../repository/cars");

async function carAlreadyRegistered(plate) {
  const result = await repositoryCars.findOne({ plate });

  if (result) return true;
  return false;
}

module.exports = carAlreadyRegistered;
