import express from "express";
import path from "path";
import bodyParser from "body-parser";

import rootDir from "@utils/path";
import { connectToMongo } from "@utils/database";
// import shopRoutes from "./routes/shop";
// import adminRoutes from "./routes/admin";
// import getFallbackPage from "./controllers/fallback";

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

// TODO: Delete this after rewriting every file to typescript
app.use("/", (req, res) => res.send("<h1>hello</h1>"));

// app.use(async (req, res, next) => {
//   try {
//     const user = await User.findByPk(1);
//     if (user) req.user = user;
//   } catch {
//     console.log("found no user");
//   }
//   next();
// });

// app.use("/admin", adminRoutes);

// app.use("/", shopRoutes);

// app.use(getFallbackPage);

connectToMongo().then(() => app.listen(3000));
