import { Schema, model } from "mongoose";
import { ProductSchema } from "./Product.js";

const CartSchema = new Schema({
  email: { type: String, require: true },
  products: { type: [ProductSchema], required: true },
  deliveryAddress: { type: String, require: true },
  timestamp: { type: Number, required: true },
  total: { type: Number, default: 0 },
});

const Cart = model("carritos", CartSchema);

export { CartSchema, Cart };
