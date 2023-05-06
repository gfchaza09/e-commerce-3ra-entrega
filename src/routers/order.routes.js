import { Router } from "express";
import passport from "passport";
import OrderController from "../controllers/order.controller.js";

const orderRouter = Router();

// [GET] 🌐/api/order/:email
orderRouter.get("/:email", OrderController.getAllOrdersByBuyerEmail);

// [GET] 🌐/api/order/:id
orderRouter.get("/:id", OrderController.getOrderById);

// [POST] 🌐/api/order
orderRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  OrderController.createOrder
);

export default orderRouter;
