import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  timestamp: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: String, required: true },
  photoUrl: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  inCart: { type: Number, default: 0 },
});

const Product = model("productos", ProductSchema);

export { ProductSchema, Product };
