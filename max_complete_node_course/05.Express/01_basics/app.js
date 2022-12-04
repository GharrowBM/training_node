const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use("/user", (req, res, next) => {
  console.log("In the middleware");
  res.send("Users !");
});

app.use("/", (req, res, next) => {
  console.log("In the middleware");
  res.send("Hello world !");
});

app.use((req, res, next) => {
  console.log("In the middleware");
  res.send("Error !");
});


app.listen(3000);
