import Product from "@models/product";
import User from "@models/user";

import type { Request, Response } from "express";

export function getProducts(req: Request, res: Response) {
  Product.findAll()
    .then((prods) => {
      res.render("admin/products", {
        prods,
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
  const userId = User.defaultUserId;
  Product.insertOne({ ...req.body, userId: userId.toString() })
    .then(() => res.redirect("/products"))
    .catch(console.log);
}

export function getEditProduct(req: Request, res: Response) {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findOneById({ _id: prodId })
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

  Product.updateOne({ _id: prodId, newDoc: productNewProps })
    .then(() => res.redirect("/admin/products"))
    .catch(() => res.redirect("/404"));
}

export function postDeleteProduct(req: Request, res: Response) {
  const prodId = req.body.productId;
  Product.deleteOne(prodId)
    .then(() => res.redirect("/admin/products"))
    .catch(() => res.redirect("/404"));
}
