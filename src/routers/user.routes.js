import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = Router();

// [GET] 🌐/api/user/:id?
userRouter.get("/:id", UserController.getUserById);

export default userRouter;
