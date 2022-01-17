const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    Product.fetchAll((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), console.log);
    });
  }

  static fetchAll(callback) {
    fs.readFile(p, (err, fileContent) =>
      callback(err ? [] : JSON.parse(fileContent))
    );
  }
};
