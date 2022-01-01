const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("first middleware");
  next();
});

app.use((req, res) => {
  console.log("second middleware");
  res.send("<h1>Hello World!</h1>");
});

app.listen(3000, () => console.log("started the server on port 3000"));
