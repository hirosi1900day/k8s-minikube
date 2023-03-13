var { CONNECTION_URL, OPTIONS, DATABSE } = require("../config/mongodb.config");
var router = require("express").Router();
var { MongoClient, ObjectID } = require("mongodb");

var validateRegistData = function (body) {
  var isValidated = true, errors = {};

  if (!body.url) {
    isValidated = false;
    errors.url = "URLが未入力です。'/'から始まるURLを入力してください。";
  }

  if (body.url && /^\//.test(body.url) === false) {
    isValidated = false;
    errors.url = "'/'から始まるURLを入力してください。";
  }

  if (!body.title) {
    isValidated = false;
    errors.title = "タイトルが未入力です。任意のタイトルを入力してください。";
  }

  return isValidated ? undefined : errors;
};

var createRegistData = function (id, body) {
  var datetime = new Date();
  var data = {
    url: body.url,
    updated: datetime,
    title: body.title,
    content: body.content,
    keywords: (body.keywords || "").split(","),
    authors: (body.authors || "").split(","),
  };
  if (id) {
    data._id = id;
  }
  return data;
};

router.post("/:id/edit/input", (req, res) => {
  var id = req.params.id;
  if (req.headers["referer"].indexOf("confirm") < 0) {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
      var db = client.db(DATABSE);
      db.collection("posts")
        .findOne({ _id: ObjectID(id) })
        .then((result) => {
          res.render("./account/posts/edit-form.ejs", { original: result });
        }).catch((error) => {
          throw error;
        }).then(() => {
          client.close();
        })
    });
  } else {
    var original = createRegistData(id, req.body);
    res.render("./account/posts/edit-form.ejs", { original });
  }
});

router.post("/:id/edit/confirm", (req, res) => {
  var id = req.params.id;
  var original = createRegistData(id, req.body);
  var errors = validateRegistData(req.body);
  if (errors) {
    res.render("./account/posts/edit-form.ejs", { errors, original });
    return;
  }
  res.render("./account/posts/edit-confirm.ejs", { original });
});

router.post("/:id/edit/execute", (req, res) => {
  var id = req.params.id;

  var original = createRegistData(null, req.body);
  var errors = validateRegistData(req.body);
  if (errors) {
    res.render("./account/posts/edit-form.ejs", { errors, original });
    return;
  }

  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    var db = client.db(DATABSE);
    db.collection("posts")
      .updateOne(
        { _id: { $eq: ObjectID(id) } },
        { $set: original }
      ).then((results) => {
        res.redirect(`/account/posts/${id}/edit/complete`);
      }).catch((error) => {
        throw error;
      }).then(() => {
        client.close();
      })
  });
});

router.get("/:id/edit/complete", (req, res) => {
  res.render("./account/posts/edit-complete.ejs");
});

module.exports = router;