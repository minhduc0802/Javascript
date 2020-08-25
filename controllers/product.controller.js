var Product = require("../models/product.model");

// module.exports.index = function (req, res, next) {
//   // res.render("products/index", {
//   //   products: db.get("products").value()
//   // });

//   Product.find().then(function(products){
//     res.render("products/index", {
//       products: products
//     });
//   });
// };

module.exports.index = async function (req, res) {
  var products = await Product.find();
  res.render("products/index", {
    products: products,
  });
};
