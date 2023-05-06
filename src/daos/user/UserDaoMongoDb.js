import { User } from "../../models/User.js";
import MongodbDAO from "../../classes/MongodbDAO.js";

class UserDaoMongoDb extends MongodbDAO {
  constructor() {
    super(User);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserDaoMongoDb();
    }
    return this.instance;
  }

  async getUserByEmail(email) {
    try {
      return await this.coleccion.findOne({ email });
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async addMessageToUserById(userId, message) {
    try {
      return await this.coleccion.updateOne(
        { _id: userId },
        { $push: { mensajes: message } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateUserMessagesById(userId, messages) {
    try {
      await this.coleccion.updateOne(
        { _id: userId },
        { $set: { mensajes: [] } }
      );
      return await this.coleccion.updateOne(
        { _id: userId },
        { $push: { mensajes: messages } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteMessageFromUserById(userId, messageId) {
    try {
      return await this.coleccion.updateOne(
        { _id: userId },
        { $pull: { mensajes: { _id: messageId } } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default UserDaoMongoDb;
