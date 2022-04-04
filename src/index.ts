import express from "express";
import path from "path";
import bodyParser from "body-parser";

import rootDir from "@utils/path";
import { connectToMongo } from "@utils/database";

import shopRoutes from "@routes/shop";
import adminRoutes from "@routes/admin";
import getFallbackPage from "@controllers/fallback";
import User from "@models/user";

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use(async (req, res, next) => {
  try {
    const adminUser = await User.findByUserInfo({ accessLvl: "admin" });
    // @ts-ignore
    if (adminUser) req.user = adminUser;
  } catch {
    console.log("found no user");
  }
  next();
});

app.use("/admin", adminRoutes);

app.use("/", shopRoutes);

app.use(getFallbackPage);

connectToMongo().then(async () => {
  try {
    const adminUser = await User.findByUserInfo({ accessLvl: "admin" });
    if (!adminUser)
      await User.createUser({
        username: "admin",
        email: "some@some",
        password: "1234",
        accessLvl: "admin",
      });
    app.listen(3000);
  } catch {
    console.log("could not find or create admin user");
  }
});
