const path = require("path");

const rootDir = require("../utils/path");

module.exports = (_, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
};
