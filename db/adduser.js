// use weblog
db.createUser({
  user: "user",
  pwd: "welcome",
  roles: [{
    role: "readWrite", db: "weblog"
  }]
})