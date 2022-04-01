const path = require("path");

module.exports = (_, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
};
