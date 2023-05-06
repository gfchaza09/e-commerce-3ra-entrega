import { Message } from "../../models/Message.js";
import MongodbDAO from "../../classes/MongodbDAO.js";
import { logError } from "../../loggers/index.js";

class MessageDaoMongoDb extends MongodbDAO {
  constructor() {
    super(Message);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MessageDaoMongoDb();
    }
    return this.instance;
  }

  async addReplyToMessageById(messageId, reply) {
    try {
      await this.coleccion.updateOne(
        { _id: messageId },
        { $push: { replies: reply } }
      );
      return this.list(messageId);
    } catch (err) {
      logError(err);
    }
  }
}

export default MessageDaoMongoDb;
