const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");

const clientsRoutes = require("./routes/clients").routes;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/clients", clientsRoutes);

app.get("/", (req, res, next) => {
  res.render("index", { docTitle: 'Home'});
});

app.get("/*", (req, res, next) => {
  res.render("error", { docTitle: 'Error 404', errorCode: 404, errorMessage: "Page not found!"});
});

app.listen(3000);
