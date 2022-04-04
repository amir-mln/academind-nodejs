import path from "path";

import express from "express";

import {
  getAddProduct,
  getProducts,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} from "@controllers/admin";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/products", getProducts);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

export default router;
