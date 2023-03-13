var { CONNECTION_URL, OPTIONS, DATABSE } = require("../config/mongodb.config");
var { authenticate, authorize } = require("../lib/security/accountcontrol.js");
var router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
var tokens = new require("csrf")();

router.get("/", (req, res) => {
  res.render("./account/config/index.ejs");
});

module.exports = router;