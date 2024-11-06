const express = require("express");
const { router } = require("./routes");

const app = express();

app.use(router);
app.use(express.json());

module.exports = { app };
