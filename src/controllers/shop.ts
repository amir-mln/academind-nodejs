import { ObjectId, WithId } from "mongodb";

import { CartItem, UserType } from "@customTypes/user-types";
import Product from "@models/product";
import User from "@models/user";

import type { Request, Response } from "express";
import Order from "@models/order";

export async function getIndex(req: Request, res: Response) {
  try {
    const prods = await Product.findAll();
    res.render("shop/index", {
      prods,
      pageTitle: "Shop",
      path: "/",
    });
  } catch {
    res.redirect("/404");
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const prods = await Product.findAll();
    res.render("shop/product-list", {
      prods,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch {
    res.redirect("/404");
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const product = await Product.findOneById({ _id: req.params.productId });

    res.render("shop/product-detail", {
      product: product,
      pageTitle: product!.title,
      path: "/products",
    });
  } catch {
    res.redirect("/404");
  }
}

export async function getCart(req: Request, res: Response) {
  try {
    const userId = User.defaultUserId;
    const items = (await User.findById(userId))!.cart.items;
    const productIds = items.map((item) => item.productId);
    const products = await Product.findAll({ _id: { $in: productIds } });
    const productWithQty = [];

    for (const product of products) {
      const correspondingItem = items.find((item) =>
        item.productId.equals(product._id)
      );
      productWithQty.push({
        ...product,
        quantity: correspondingItem?.quantity,
      });
    }

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: productWithQty,
    });
  } catch {
    res.redirect("/404");
  }
}

export async function postCart(req: Request, res: Response) {
  const userId = User.defaultUserId;
  const prodId = req.body.productId;
  try {
    const user = await User.findById(userId);
    const userCart = { ...user!.cart };
    const prodIndex = userCart.items.findIndex((item) =>
      item.productId.equals(prodId)
    );
    if (~prodIndex) {
      userCart.items[prodIndex].quantity += 1;
    } else {
      userCart.items.push({ productId: new ObjectId(prodId), quantity: 1 });
    }

    await User.updateCart(userId, userCart);
    res.redirect("/cart");
  } catch {
    res.redirect("/404");
  }
}

export async function postCartDeleteProduct(req: Request, res: Response) {
  try {
    const prodId = req.body.productId;
    const userId = User.defaultUserId;
    const user = (await User.findById(userId)) as WithId<UserType>;
    const filteredItems = user.cart.items.filter(
      (item) => !item.productId.equals(prodId)
    );
    await User.updateCart(userId, { items: filteredItems });

    res.redirect("/cart");
  } catch {
    res.redirect("/404");
  }
}

export async function getOrders(req: Request, res: Response) {
  try {
    const user = await User.findById(User.defaultUserId);
    const userOrders = await Order.find({ userId: user!._id });

    for (const order of userOrders) {
      const orderItems = order.cart.items;
      const productIds = orderItems.map((item) => item.productId);
      const products = await Product.findAll({ _id: { $in: productIds } });

      for (const item of orderItems) {
        const correspondingProduct = products.find((p) =>
          p._id.equals(item.productId)
        );
        // @ts-ignore
        item.title = correspondingProduct!.title;
      }
    }

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: userOrders,
    });
  } catch {}
}

export async function postOrder(req: Request, res: Response) {
  try {
    const user = await User.findById(User.defaultUserId);
    const date =
      new Date().toLocaleDateString() + " " + new Date().toTimeString();
    const orderDocument = {
      date,
      cart: user!.cart,
      userId: user!._id,
    };
    const order = await Order.insertOne(orderDocument);
    await User.addOrder(user!._id, {
      orderId: order.insertedId,
      date,
    });
    await User.updateCart(user!._id, { items: [] });
    res.redirect("/orders");
  } catch {
    res.redirect("/cart");
  }
}
