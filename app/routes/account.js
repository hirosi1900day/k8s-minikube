var { CONNECTION_URL, OPTIONS, DATABSE } = require("../config/mongodb.config");
var { authenticate, authorize } = require("../lib/security/accountcontrol.js");
var router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
var tokens = new require("csrf")();

router.get("/", authorize("readWrite"), (req, res) => {
  res.render("./account/index.ejs");
});

router.get("/login", (req, res) => {
  res.render("./account/login.ejs", { message: req.flash("message") });
});

router.post("/login", authenticate());

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/account/login");
});

router.use("/posts/search", authorize("readWrite"), require("./account.posts.search.js"));
router.use("/posts/regist", authorize("readWrite"), require("./account.posts.regist.js"));
router.use("/posts", authorize("readWrite"), require("./account.posts.delete.js"));
router.use("/posts", authorize("readWrite"), require("./account.posts.edit.js"));
router.use("/config", authorize("readWrite"), require("./account.config.js"));

module.exports = router;