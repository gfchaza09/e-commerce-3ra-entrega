import MessageService from "../services/message.service.js";
import { logError, logWarning } from "../loggers/index.js";
import userService from "../services/user.service.js";

class MessageController {
  constructor() {}

  async getAllMessages(req, res) {
    try {
      const messages = await MessageService.getAllMessages();
      if (!messages) {
        res.status(404);
        res.send({ status: 404, description: "Messages not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      }
      res.status(200);
      res.json({ messages });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async getMessagesByUserId(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const messages = await MessageService.getMessagesByUserId(id);
      if (!messages) {
        res.status(404);
        res.send({ status: 404, description: "Messages not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      res.status(200);
      res.json({ messages });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async createMessage(req, res) {
    try {
      const { body } = req;
      const message = await MessageService.createMessage(body);
      res.status(200);
      res.json({ message });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async addReplyToMessageById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      const messages = await MessageService.addReplyToMessageById(id, body);
      res.json({ messages });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async deleteMessageById(req, res) {
    try {
      const {
        params: { userId, messageId },
      } = req;
      const user = await userService.getUserById(userId);
      const message = await MessageService.getMessageById(messageId);
      if (!user) {
        res.status(404);
        res.send({ status: 404, description: "User not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      if (!message) {
        res.status(404);
        res.send({ status: 404, description: "Message not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      const deletedMessage = await MessageService.deleteMessageById(
        userId,
        messageId
      );
      res.status(200);
      res.json({ deletedMessage });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }
}

export default new MessageController();
