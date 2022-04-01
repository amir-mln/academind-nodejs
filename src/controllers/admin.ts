const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user
    .createProduct({ title, imageUrl, price, description })
    .then(() => res.redirect("/"))
    .catch(() => res.redirect("/404"));
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/");
  }

  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      !products[0]
        ? res.redirect("/")
        : res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: products[0],
          });
    })
    .catch(() => res.redirect("/404"));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.set({
        title: updatedTitle,
        price: updatedPrice,
        imageUrl: updatedImageUrl,
        description: updatedDesc,
      });
      return product.save();
    })
    .then(() => res.redirect("/admin/products"))
    .catch(() => res.redirect("/404"));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(() => res.redirect("/404"));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => product.destroy())
    .then(() => res.redirect("/admin/products"))
    .catch(() => res.redirect("/404"));
};
