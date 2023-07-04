require("./config/db");

const app = require("express")();
const bodyParser = require("express").json;
const port = 4000;

app.use(bodyParser());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
