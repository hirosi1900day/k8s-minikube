var { CONNECTION_URL, OPTIONS, DATABSE } = require("../config/mongodb.config");
var router = require("express").Router();
var { MongoClient, ObjectID } = require("mongodb");

router.post("/:id/delete/confirm", (req, res) => {
  var id = req.params.id;

  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    var db = client.db(DATABSE);
    db.collection("posts")
      .findOne({ _id: ObjectID(id) })
      .then((results) => {
        res.render("./account/posts/delete-confirm.ejs", results);
      }).catch((error) => {
        throw error;
      }).then(() => {
        client.close();
      })
  });
});

router.post("/:id/delete/execute", (req, res) => {
  var id = req.params.id;

  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    var db = client.db(DATABSE);
    db.collection("posts")
      .deleteOne({ _id: ObjectID(id) })
      .then((results) => {
        res.redirect(`/account/posts/${id}/delete/complete`);
      }).catch((error) => {
        throw error;
      }).then(() => {
        client.close();
      });
  });
});

router.get("/:id/delete/complete", (req, res) => {
  res.render("./account/posts/delete-complete.ejs");
});

module.exports = router;