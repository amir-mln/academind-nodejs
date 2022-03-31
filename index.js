const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const getFallbackPage = require("./controllers/fallback");
const { connectToMongo } = require("./utils/database");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

// app.use(async (req, res, next) => {
//   try {
//     const user = await User.findByPk(1);
//     if (user) req.user = user;
//   } catch {
//     console.log("found no user");
//   }
//   next();
// });

app.use("/admin", adminRoutes);

app.use("/", shopRoutes);

app.use(getFallbackPage);

connectToMongo().then(() => app.listen(3000));
