var db = require("../db");

module.exports.requireAuth = function (req, res, next) {
  console.log(req.cookies, req.signedCookies);
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  console.log("qqq");
  var ck = parseInt(req.signedCookies.userId);//convert cookie
  var user = db.get("users").find({ id: ck }).value();

  if (!user) {
    res.redirect("/auth/login");
    return;
  }
 
  res.locals.user = user;
  console.log(user.name);

  next();
};
