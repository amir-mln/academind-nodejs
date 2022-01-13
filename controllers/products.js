const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const prod = new Product(req.body.title);
  prod.save();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  res.render("shop", {
    prods: Product.fetchAll(),
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
