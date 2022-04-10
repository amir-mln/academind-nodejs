import express from "express";
import path from "path";
import bodyParser from "body-parser";

import rootDir from "@utils/path";
import shopRoutes from "@routes/shop";
import adminRoutes from "@routes/admin";
import { connectToMongo } from "@utils/database";
import getFallbackPage from "@controllers/fallback";
import setDefaultUser from "@utils/set-default-user";

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes);

app.use("/", shopRoutes);

app.use(getFallbackPage);

connectToMongo()
  .then(setDefaultUser)
  .then(() => app.listen(3000))
  .catch(console.log);
