const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const sequelizeInstance = require("./utils/database");
const getFallbackPage = require("./controllers/fallback");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes);

app.use("/", shopRoutes);

app.use(getFallbackPage);

sequelizeInstance
  .sync()
  .then(() => app.listen(3000))
  .catch(console.log);
