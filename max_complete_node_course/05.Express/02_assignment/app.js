const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("First logging");
  next();
});

app.use("/users", (req, res, next) => {
  console.log("Second logging");
  res.send("Users!");
});

app.use("/", (req, res, next) => {
console.log("Second logging");
res.send("Hello world!");
});

app.listen(3000);
