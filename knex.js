require("dotenv").config();
const knex = require("knex");
const knexfile = require("./knexfile.js");

/** @type {import('knex').Knex}*/
const session = knex(knexfile[process.env.KNEX_ENVIROMENT]);

module.exports = { session };
