require("dotenv").config();
console.log(process.env.SESSION_SECRET);
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

var userRoute = require("./routes/user.route");
var authRoute = require("./routes/auth.route");
var productRoute = require("./routes/product.route");
var cartRoute = require("./routes/cart.route");
var transferRoute = require("./routes/transfer.route");

var apiProductRoute = require("./api/routes/product.route");

var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware = require("./middlewares/session.middleware");

var port = 4200;

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index", {
    name: "aaaa",
  });
});

app.use("/user", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/transfer", authMiddleware.requireAuth, transferRoute);

app.use("/api/products", apiProductRoute);

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
