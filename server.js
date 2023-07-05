require("./config/db");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const UserRouter = require("./api/User");

const port = 4000;

app.use(bodyParser.json());

app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
