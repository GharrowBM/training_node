const path = require("path");
const express = require("express");

const rootDir = require('../util/path')

const router = express.Router();

router.get("/", (req, res, next) => {
  const filePath = path.join(rootDir, "views", "index.html");

  res.sendFile(filePath);
});

module.exports = router;
