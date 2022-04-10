import { getDatabase } from "@utils/database";
import withObjectId from "@utils/with-object-id";

import type { Filter, ObjectId } from "mongodb";
import type { ProductProps } from "@customTypes/product-types";
import { type } from "os";

class Product {
  private static db = getDatabase();
  private static collection = this.db.collection<ProductProps>("products");

  static findAll(filterObj: Filter<ProductProps> = {}) {
    return this.collection.find(filterObj).toArray();
  }

  static insertOne(product: ProductProps) {
    return this.collection.insertOne(product);
  }

  static findOneById = withObjectId((params: { _id: ObjectId }) => {
    return this.collection.findOne({ _id: params._id });
  });

  static updateOne = withObjectId(
    (params: { _id: ObjectId; newDoc: ProductProps }) => {
      return this.collection.updateOne(
        { _id: params._id },
        { $set: params.newDoc }
      );
    }
  );

  static deleteOne = withObjectId((params: { _id: ObjectId }) => {
    return this.collection.deleteOne({ _id: params._id });
  });
}

export default Product;

type x = Omit<{ _id: ObjectId; newDoc: ProductProps }, "_id">;
