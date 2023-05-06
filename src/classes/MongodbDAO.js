import mongoose from "mongoose";
import config from "../config/config.js";
import { logError, logInfo } from "../loggers/index.js";

await mongoose
  .connect(config.mongodb.mongoUrl, config.mongodb.options)
  .then(() => logInfo("Base de datos MONGO conectada"))
  .catch((err) => logError("Base de datos MONGO no conectada"));

class MongodbDAO {
  constructor(model) {
    this.coleccion = model;
  }

  async list(id) {
    try {
      const item = await this.coleccion.findById(id);
      return item ? item : null;
    } catch (error) {
      logError(error);
    }
  }

  async listAll() {
    try {
      const items = await this.coleccion.find({});
      return items;
    } catch (error) {
      logError(error);
    }
  }

  async save(item) {
    try {
      let timestamp = Date.now();
      const newItem = { ...item, timestamp };
      const result = await this.coleccion.create(newItem);
      return result._id;
    } catch (error) {
      logError(error);
    }
  }

  async update(item, id) {
    try {
      const updatedItem = await this.coleccion.findById(id);
      if (updatedItem) {
        const result = await this.coleccion.findOneAndUpdate(
          { _id: id },
          { ...item, timestamp: Date.now() },
          { new: true }
        );
        return result;
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }

  async delete(id) {
    try {
      const deletedItem = await this.coleccion.findById(id);
      if (deletedItem) {
        const result = await this.coleccion.findOneAndDelete({ _id: id });
        return result;
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }

  async deleteAll() {
    await this.coleccion.deleteMany({});
  }
}

export default MongodbDAO;
