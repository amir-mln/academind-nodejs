const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "products.json");

function getProductsFromFile(cb) {
  fs.readFile(p, (err, fileContent) => cb(err ? [] : JSON.parse(fileContent)));
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), console.log);
    });
  }

  static fetchAll = getProductsFromFile;
};
