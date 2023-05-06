import { Router } from "express";

import authWebRouter from "./auth.routes.js";
import messageRouter from "./message.routes.js";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import orderRouter from "./order.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/", authWebRouter);
router.use("/consultas", messageRouter);
router.use("/api/productos", productRouter);
router.use("/api/carrito", cartRouter);
router.use("/api/order", orderRouter);
router.use("/api/user", userRouter);

export default router;
