import { mensajesDao } from "../daos/index.js";
import UserService from "./user.service.js";
import { getHourAndMinutes } from "../utils/getHourAndMinutes.js";

class MessageService {
  constructor() {}

  async getAllMessages() {
    try {
      return await mensajesDao.listAll();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getMessagesByUserId(userId) {
    try {
      const { messages } = await UserService.getUserById(userId);
      return messages;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getMessageById(messageId) {
    try {
      return await mensajesDao.list(messageId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createMessage(body) {
    try {
      const { _id } = await UserService.getUserByEmail(body.email);
      const newMessage = {
        userId: _id.toString(),
        email: body.email,
        message: body.message,
        hour: getHourAndMinutes(new Date()),
      };
      const createdMessage = await mensajesDao.save(newMessage);
      await UserService.addMessageToUserById(_id, newMessage);
      return createdMessage;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async addReplyToMessageById(messageId, body) {
    try {
      const { _id } = await UserService.getUserByEmail(body.email); // replier
      const { userId } = await this.getMessageById(messageId);
      const newReply = {
        userId: _id.toString(), // replier
        email: body.email, // replier
        message: body.message,
        hour: getHourAndMinutes(new Date()),
      };
      const messageUpdated = await mensajesDao.addReplyToMessageById(
        messageId,
        newReply
      );
      let messages = await this.getAllMessages();
      messages = messages.filter((message) => message._id != messageId);
      messages.push(messageUpdated);
      await UserService.updateUserMessagesById(userId, messages); // creator of message
      return await this.getAllMessages();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteMessageById(userId, messageId) {
    try {
      await UserService.deleteMessageFromUserById(userId, messageId);
      return await mensajesDao.delete(messageId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new MessageService();
