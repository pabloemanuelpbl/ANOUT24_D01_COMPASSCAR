require("dotenv").config();
const knex = require("knex");
const knexfile = require("./knexfile.js");

const session = knex(knexfile[process.env.KNEX_ENVIROMENT]);

module.exports = { session };
