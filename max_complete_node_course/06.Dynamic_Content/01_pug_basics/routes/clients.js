const express = require("express");

const router = express.Router();

const clients = [
  {
    firstname: "Sandra",
    lastname: "DUPONT",
  },
  {
    firstname: "John",
    lastname: "SMITH",
  },
];

router.get("/add-client", (req, res, next) => {
  res.render("clients/add-client", { docTitle: "Add a Client" });
});

router.post("/add-client", (req, res, next) => {
  clients.push({ firstname: req.body.firstname, lastname: req.body.lastname });
  res.redirect("/clients");
});

router.get("/", (req, res, next) => {
  res.render("clients/client-list", { docTitle: "Clients List", clients });
});

exports.routes = router;
