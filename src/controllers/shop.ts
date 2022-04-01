const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (_, res) => {
  Product.findAll({})
    .then((prods) => {
      res.render("shop/product-list", {
        prods,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch(() => res.redirect("/404"));
};

exports.getProduct = (req, res) => {
  Product.findByPk(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch(() => res.redirect("/404"));
};

exports.getIndex = (req, res) => {
  Product.findAll({})
    .then((prods) => {
      res.render("shop/index", {
        prods,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch(() => res.redirect("/404"));
};

exports.getCart = async (req, res) => {
  const userCart = await req.user.getCart();
  const products = await userCart.getProducts();

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products,
  });
};

exports.postCart = async (req, res) => {
  const prodId = req.body.productId;
  const userCart = await req.user.getCart();
  const cartProducts = await userCart.getProducts({ where: { id: prodId } });
  let product;
  let quantity = 1;

  // if we already have the item in our cart
  if (cartProducts.length) {
    product = cartProducts[0];
    quantity += product.cartItem.quantity;
  } else {
    product = await Product.findByPk(prodId);
  }

  await userCart.addProduct(product, { through: { quantity } });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = async (req, res) => {
  const prodId = req.body.productId;
  const userCart = await req.user.getCart();
  const products = await userCart.getProducts({ where: { id: prodId } });

  await products[0].cartItem.destroy();
  res.redirect("/cart");
};

exports.getOrders = async (req, res) => {
  const orders = await req.user.getOrders({ include: ["products"] });
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders,
  });
};

exports.postOrder = async (req, res) => {
  const userCart = await req.user.getCart();
  const products = await userCart.getProducts();
  const order = await req.user.createOrder();
  products.forEach((product) => {
    product.orderItem = { quantity: product.cartItem.quantity };
  });

  await order.addProducts(products);
  await userCart.setProducts(null);
  res.redirect("/orders");
};

exports.getCheckout = (_, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
