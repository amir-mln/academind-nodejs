import Product from "@models/product";
import type { Request, Response } from "express";
// import Cart from "@models/cart";

export function getIndex(req: Request, res: Response) {
  Product.findAll()
    .then((prods) => {
      res.render("shop/index", {
        prods,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch(() => res.redirect("/404"));
}

export function getProducts(req: Request, res: Response) {
  Product.findAll()
    .then((prods) => {
      res.render("shop/product-list", {
        prods,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch(() => res.redirect("/404"));
}

export const getProduct = (req: Request, res: Response) => {
  Product.findOneById(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product!.title,
        path: "/products",
      });
    })
    .catch(() => res.redirect("/404"));
};

// export const getCart = async (req, res) => {
//   const userCart = await req.user.getCart();
//   const products = await userCart.getProducts();

//   res.render("shop/cart", {
//     path: "/cart",
//     pageTitle: "Your Cart",
//     products,
//   });
// };

// export const postCart = async (req, res) => {
//   const prodId = req.body.productId;
//   const userCart = await req.user.getCart();
//   const cartProducts = await userCart.getProducts({ where: { id: prodId } });
//   let product;
//   let quantity = 1;

//   // if we already have the item in our cart
//   if (cartProducts.length) {
//     product = cartProducts[0];
//     quantity += product.cartItem.quantity;
//   } else {
//     product = await Product.findByPk(prodId);
//   }

//   await userCart.addProduct(product, { through: { quantity } });
//   res.redirect("/cart");
// };

// export const postCartDeleteProduct = async (req, res) => {
//   const prodId = req.body.productId;
//   const userCart = await req.user.getCart();
//   const products = await userCart.getProducts({ where: { id: prodId } });

//   await products[0].cartItem.destroy();
//   res.redirect("/cart");
// };

// export const getOrders = async (req, res) => {
//   const orders = await req.user.getOrders({ include: ["products"] });
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//     orders,
//   });
// };

// export const postOrder = async (req, res) => {
//   const userCart = await req.user.getCart();
//   const products = await userCart.getProducts();
//   const order = await req.user.createOrder();
//   products.forEach((product) => {
//     product.orderItem = { quantity: product.cartItem.quantity };
//   });

//   await order.addProducts(products);
//   await userCart.setProducts(null);
//   res.redirect("/orders");
// };

// export const getCheckout = (_, res) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
