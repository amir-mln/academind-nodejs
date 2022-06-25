import { ObjectId } from "mongodb";
import { Cart } from "./user-types";

export type OrderType = {
  cart: Cart;
  userId: ObjectId;
  date: string;
};
