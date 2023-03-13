var ConnectionString = class {
  constructor(username, password, hosts, database, optioins) {
    this.username = username || "";
    this.password = password || "";
    this.hosts = hosts ? (hosts || "").split(",") : ["localhost:27017"];
    this.database = database || "test";
    this.options = optioins || null;
  }

  setOption(key, value) {
    this.options = this.options || {};
    this.options[key] = value;
  }

  toString() {
    var url = "";

    // Protocol
    url += "mongodb://";

    // Account
    if (this.username || this.password) {
      url += `${this.username}:${this.password}@`;
    }

    // Hostname
    url += this.hosts.join(",");
    url += "/";

    // Database
    url += this.database;

    // Options
    if (this.options) {
      url += "?";
      for (var key in this.options) {
        url += `${key}=${this.options[key]}&`;
      }
      url = url.slice(0, url.length - 1);
    }

    return url;
  }
};

var connection = new ConnectionString(
  process.env.MONGODB_USERNAME || "",
  process.env.MONGODB_PASSWORD || "",
  process.env.MONGODB_HOSTS || "",
  process.env.MONGODB_DATABASE || ""
);
(process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) && connection.setOption("authSource", "weblog");
process.env.MONGODB_REPLICASET && connection.setOption("replicaSet", process.env.MONGODB_REPLICASET);

module.exports = {
  CONNECTION_URL: connection.toString(),
  DATABSE: "weblog",
  OPTIONS: {
    family: 4,
    useNewUrlParser: true
  }
};