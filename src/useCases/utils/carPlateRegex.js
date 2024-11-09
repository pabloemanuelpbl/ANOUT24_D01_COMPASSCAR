const carPlate = /^[A-Z]{3}-[0-9][A-J,0-9][0-9]{2}$/;

/** @param {string} stringValue */
module.exports = (stringValue) => carPlate.test(stringValue);
