import { Router } from "express";
import passport from "passport";

import CartController from "../controllers/cart.controller.js";

const cartRouter = new Router();

// [GET] 🌐/api/carrito/:id/productos
cartRouter.get("/:id/productos", CartController.getProductsByCartId);

// [POST] 🌐/api/carrito
cartRouter.post("/", CartController.createCart);

// [PUT] 🌐/api/carrito/:id/productos
cartRouter.put(
  "/:id/productos",
  passport.authenticate("jwt", { session: false }),
  CartController.deleteAllProductsCartById
);

// [POST] 🌐/api/carrito/:cartId/productos/:prodId
cartRouter.post(
  "/:cartId/productos/:prodId",
  passport.authenticate("jwt", { session: false }),
  CartController.createProductOfACart
);

// [DELETE] 🌐/api/carrito/:id
cartRouter.delete("/:id", CartController.deleteCartById);

// [DELETE] 🌐/api/carrito/:cartId/productos/:prodId
cartRouter.delete(
  "/:cartId/productos/:prodId",
  passport.authenticate("jwt", { session: false }),
  CartController.deleteProductById
);

cartRouter.get("/favicon.ico", (req, res) => res.send(""));

export default cartRouter;
