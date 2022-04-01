import { getDatabase } from "../utils/database";

class Product {
  title: string;
  price: string;
  imageUrl: string;
  description: string;

  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  async save() {
    const db = getDatabase();
    await db.collection("products").insertOne(this);
  }
}

export default Product;
