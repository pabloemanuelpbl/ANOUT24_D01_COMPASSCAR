/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cars_items", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("car_id").unsigned();
    table.foreign("car_id").references("cars.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cars_items");
};
