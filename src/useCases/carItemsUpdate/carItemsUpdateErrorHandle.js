/** @param {string[]} newItems  */
function carItemsUpdateErrorHandle(newItems) {
  /** @type {string[]} */
  let errors = [];

  //se não vier um array
  if (!Array.isArray(newItems)) {
    errors.push("items is required");
    return errors;
  }

  if (!newItems || newItems.length == 0) errors.push("items is required");
  if (newItems.length > 5) errors.push("items must be a maximum of 5");
  if (new Set(newItems).size !== newItems.length)
    errors.push("items cannot be repeated");

  return errors;
}

module.exports = carItemsUpdateErrorHandle;
