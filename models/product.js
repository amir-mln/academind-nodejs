const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    fs.readFile(p, (err, data) => {
      let tempProducts = [];
      if (!err) tempProducts = JSON.parse(data);
      tempProducts.push(this);
      fs.writeFile(p, JSON.stringify(tempProducts), console.log);
    });
  }

  static fetchAll() {
    let allProducts;
    try {
      allProducts = JSON.parse(fs.readFileSync(p));
    } catch (error) {
      allProducts = [];
    }

    return allProducts;
  }
};
