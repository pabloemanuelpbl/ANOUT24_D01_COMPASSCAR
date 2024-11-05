require("dotenv").config();
const { app } = require("./app");

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, () => {
  console.log("server started: http://localhost:" + SERVER_PORT);
});
