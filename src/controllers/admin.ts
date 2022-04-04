import Product from "../models/product";
import type { Request, Response } from "express";

export function getProducts(req: Request, res: Response) {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(() => res.redirect("/404"));
}

export function getAddProduct(req: Request, res: Response) {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
}

export function postAddProduct(req: Request, res: Response) {
  // @ts-ignore
  Product.insertOne({ ...req.body, userId: req.user._id })
    .then(() => res.redirect("/products"))
    .catch(console.log);
}

export function getEditProduct(req: Request, res: Response) {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findOneById(prodId)
    .then((product) => {
      !product
        ? res.redirect("/")
        : res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
          });
    })
    .catch(() => res.redirect("/404"));
}

export function postEditProduct(req: Request, res: Response) {
  const { productId: prodId, ...productNewProps } = req.body;

  Product.updateOne(prodId, productNewProps)
    .then(() => res.redirect("/admin/products"))
    .catch(() => res.redirect("/404"));
}

export function postDeleteProduct(req: Request, res: Response) {
  const prodId = req.body.productId;
  Product.deleteOne(prodId)
    .then(() => res.redirect("/admin/products"))
    .catch(() => res.redirect("/404"));
}
