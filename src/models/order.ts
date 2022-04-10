import { getDatabase } from "@utils/database";
import type { OrderType } from "@customTypes/order-types";
import type { Filter } from "mongodb";

class Order {
  private static db = getDatabase();
  private static collection = this.db.collection<OrderType>("orders");

  static find(orderFilter: Filter<OrderType>) {
    return this.collection.find(orderFilter).toArray();
  }
  static insertOne(order: OrderType) {
    return this.collection.insertOne(order);
  }
}

export default Order;
