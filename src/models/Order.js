import { model, Schema } from "mongoose";
import { ProductSchema } from "./Product.js";

const PurchaseDateSchema = new Schema({
  number: { type: String, require: true },
  day: { type: String, require: true },
  month: { type: String, require: true },
  year: { type: String, require: true },
});

const OrderSchema = new Schema(
  {
    products: { type: [ProductSchema], require: true },
    state: { type: String, require: true, default: "Generada" },
    buyerEmail: { type: String, require: true },
    purchaseDate: { type: PurchaseDateSchema, require: true },
    total: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", OrderSchema);

export { Order, OrderSchema };
