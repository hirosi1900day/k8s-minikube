var { CONNECTION_URL, OPTIONS } = require("../../config/mongodb.config.js");
var { MongoClient } = require("mongodb");
var WAIT = 1000;

var tryConnect = function () {
  global.setTimeout(() => {
    console.log(`Try to connect "${CONNECTION_URL}" ...`);
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
      if (error) {
        tryConnect();
        return
      }
      client.close();
    });
  }, WAIT);
}

tryConnect();
