import type { ObjectId, WithId } from "mongodb";

export type CartItem = { productId: ObjectId; quantity: number };

export type Cart = {
  items: CartItem[];
};

export type UserOrderItem = { orderId: ObjectId; date: string };

export type UserType = {
  username: string;
  email: string;
  password: string;
  accessLvl: "admin" | "user";
  cart: Cart;
  orders: UserOrderItem[];
};
