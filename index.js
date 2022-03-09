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

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    if (user) req.user = user;
    next();
  } catch {
    console.log("found no user");
    next();
  }
});

app.use("/admin", adminRoutes);

app.use("/", shopRoutes);

app.use(getFallbackPage);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelizeInstance
  .sync()
  .then(() => User.findByPk(1))
  .then((user) =>
    user
      ? user
      : User.create({
          username: "amir",
          email: "fake@fake.com",
          password: "1234",
        })
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
