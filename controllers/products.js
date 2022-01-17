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

exports.postAddProduct = (req, res) => {
  const prod = new Product(req.body.title);
  prod.save();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((allProducts) =>
    res.render("shop", {
      prods: allProducts,
      pageTitle: "Shop",
      path: "/",
      hasProducts: allProducts.length > 0,
      activeShop: true,
      productCSS: true,
    })
  );
};
