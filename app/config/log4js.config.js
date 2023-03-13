var path = require("path");
var ROOT = path.join(__dirname, "../");

module.exports = {
  appenders: {
    ConsoleLogAppender: {
      type: "console"
    },
    FileLogAppender: {
      type: "file",
      filename: path.join(ROOT, "./log/system/system.log"),
      maxLogSize: 5000000,
      bakups: 10
    },
    MultiFileLogAppender: {
      type: "multiFile",
      base: path.join(ROOT, "./log/application/"),
      property: "key",
      extension: ".log"
    },
    DateRollingFileLogAppender: {
      type: "dateFile",
      filename: path.join(ROOT, "./log/access/access.log"),
      pattern: "yyyyMMdd",
      daysToKeep: 30
    }
  },
  categories: {
    "default": {
      appenders: ["ConsoleLogAppender"],
      level: "ALL"
    },
    system: {
      // appenders: ["FileLogAppender"],
      appenders: ["ConsoleLogAppender"],
      level: "ERROR"
    },
    application: {
      // appenders: ["MultiFileLogAppender"],
      appenders: ["ConsoleLogAppender"],
      level: "ERROR"
    },
    access: {
      // appenders: ["DateRollingFileLogAppender"],
      appenders: ["ConsoleLogAppender"],
      level: "INFO"
    }
  }
};