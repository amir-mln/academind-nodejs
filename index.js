const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const sequelizeInstance = require("./utils/database");
const getFallbackPage = require("./controllers/fallback");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    if (user) req.user = user;
  } catch {
    console.log("found no user");
  }
  next();
});

app.use("/admin", adminRoutes);

app.use("/", shopRoutes);

app.use(getFallbackPage);

User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);
Product.belongsToMany(Cart, { through: CartItem });
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sequelizeInstance
  .sync(/*{ force: true }*/)
  .then(async () => {
    let user = await User.findByPk(1);
    if (!user)
      user = await User.create({
        username: "amir",
        email: "fake@fake.com",
        password: "1234",
      });
    let cart = await Cart.findOne({ where: { userId: user.id } });
    if (!cart) await user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
