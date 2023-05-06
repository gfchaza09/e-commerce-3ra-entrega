import { Router } from "express";
import passport from "passport";
import MessageController from "../controllers/message.controller.js";

const messageRouter = Router();

// [GET] 🌐/consultas
messageRouter.get("/", MessageController.getAllMessages);

// [GET] 🌐/consultas/:id
messageRouter.get("/user/:id", MessageController.getMessagesByUserId);

// [POST] 🌐/consultas
messageRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  MessageController.createMessage
);

// [POST] 🌐/consultas/:id/reply
messageRouter.post("/:id/reply", MessageController.addReplyToMessageById);

// [DELETE] 🌐/consultas/user/:userId/consulta/:messageId
messageRouter.delete(
  "/user/:userId/consulta/:messageId/",
  MessageController.deleteMessageById
);

export default messageRouter;
