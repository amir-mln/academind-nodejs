import { getDatabase } from "@utils/database";

import type { ObjectId } from "mongodb";
import type { Cart, UserOrderItem, UserType } from "@customTypes/user-types";
import withObjectId from "@utils/with-object-id";
import { OrderType } from "@customTypes/order-types";

class User {
  private static adminUserId: ObjectId;
  private static db = getDatabase();
  private static collection = this.db.collection<UserType>("users");

  static set defaultUserId(_id: ObjectId) {
    this.adminUserId = _id;
  }

  static get defaultUserId() {
    return this.adminUserId;
  }

  static createUser(user: UserType) {
    return this.collection.insertOne(user);
  }

  static findById(_id: ObjectId) {
    return this.collection.find({ _id }).next();
  }

  static findByUserInfo(userInfo: Partial<UserType>) {
    return this.collection.find(userInfo).next();
  }

  static updateCart(_id: ObjectId, newCart: Cart) {
    return this.collection.updateOne({ _id }, { $set: { cart: newCart } });
  }

  static addOrder(userId: ObjectId, newOrder: UserOrderItem) {
    return this.collection.updateOne(
      { _id: userId },
      { $push: { orders: newOrder } }
    );
  }
}

export default User;
