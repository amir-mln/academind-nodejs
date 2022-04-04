import { getDatabase } from "@utils/database";
import withObjectId from "@utils/with-object-id";

import type { ObjectId } from "mongodb";

type productProps = {
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  userId: string;
};

const Product = (function () {
  const db = getDatabase();
  const collection = db.collection("products");

  function findAll() {
    return collection.find().toArray();
  }

  function insertOne(product: productProps) {
    return collection.insertOne(product);
  }

  function findOneById(_id: ObjectId) {
    return collection.findOne({ _id });
  }

  function updateOne(_id: ObjectId, newDoc: productProps) {
    return collection.updateOne({ _id }, { $set: newDoc });
  }

  function deleteOne(_id: ObjectId) {
    return collection.deleteOne({ _id });
  }

  return {
    findAll: findAll,
    insertOne: insertOne,
    updateOne: withObjectId<ReturnType<typeof updateOne>>(updateOne),
    deleteOne: withObjectId<ReturnType<typeof deleteOne>>(deleteOne),
    findOneById: withObjectId<ReturnType<typeof findOneById>>(findOneById),
  };
})();

export default Product;
