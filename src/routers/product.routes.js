import { Router } from "express";
import passport from "passport";

import ProductController from "../controllers/product.controller.js";

const productRouter = new Router();

// [GET] 🌐/api/productos/:id?
productRouter.get("/:id?", ProductController.getProducts);

// [GET] 🌐/api/productos/category/:category
productRouter.get(
  "/category/:category",
  ProductController.getProductsByCategoryName
);

// [POST] 🌐/api/productos/
productRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProductController.createProduct
);

// [PUT] 🌐/api/productos/:id
productRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.updateProduct
);

// [DELETE] 🌐/api/productos/:id
productRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.deleteProductById
);

productRouter.get("/favicon.ico", (req, res) => res.send(""));

export default productRouter;
