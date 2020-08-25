var db = require("../db");

module.exports.index = function (req, res) {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.search = function (req, res) {
  var q = req.query.q;
  var matchedUsers = db.get("users").value().filter(function (user) {
      return user.name.indexOf(q) !== -1;
    });

  res.render("users/index", {
    users: matchedUsers,
  });
  console.log(req.query);
};

module.exports.create = function (req, res) {
  res.render("users/create");
  console.log(req.cookies);
};

module.exports.get = function (req, res) {
  var id = parseInt(req.params.id);
  var user = db.get("users").find({ id: id }).value();

  res.render("users/view", {
    user: user,
  });
};

module.exports.postCreate = function (req, res) {
  console.log(req.body);
  console.log(res.locals);
  req.body.avatar = req.file.path.split('\\').slice(1).join('/'); 
  db.get("users").push(req.body).write();
  res.redirect("/user");
};
