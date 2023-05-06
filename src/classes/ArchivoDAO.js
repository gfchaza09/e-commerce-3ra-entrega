import fs from "fs";
import config from "../config/config.js";
import { logError } from "../loggers/index.js";

class ArchivoDAO {
  constructor(route) {
    this.route = `${config.fileSystem.path}/${route}`;
  }

  async list(id) {
    const items = await this.listAll();
    try {
      const item = items.find((prod) => prod.id === parseInt(id));
      return item ? item : null;
    } catch (error) {
      logError(error);
    }
  }

  async listAll() {
    try {
      const items = await fs.promises.readFile(this.route, "utf-8");
      return JSON.parse(items);
    } catch (error) {
      logError(error);
    }
  }

  async save(item) {
    const items = await this.listAll();

    try {
      let id;
      let timestamp = Date.now();
      items.length === 0 ? (id = 1) : (id = items[items.length - 1].id + 1);
      const newItem = { ...item, id, timestamp };
      items.push(newItem);
      await this.writeFile(items);
      return newItem.id;
    } catch (error) {
      logError(error);
    }
  }

  async update(itemUpdate, id) {
    const items = await this.listAll();
    try {
      const updatedItem = items.find((item) => item.id === parseInt(id));
      if (updatedItem) {
        const listItemsForUpdate = items.filter(
          (item) => item.id !== parseInt(id)
        );
        listItemsForUpdate.push({
          ...itemUpdate,
          id: parseInt(id),
          timestamp: Date.now(),
        });
        await this.writeFile(listItemsForUpdate);
        return updatedItem;
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }

  async delete(id) {
    const items = await this.listAll();
    try {
      const itemForDelete = items.find((item) => item.id !== parseInt(id));
      if (itemForDelete) {
        const newItemsList = items.filter((item) => item.id !== parseInt(id));
        await this.writeFile(newItemsList);
        return itemForDelete;
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }

  async deleteAll() {
    await this.writeFile([]);
  }

  async writeFile(data) {
    try {
      await fs.promises.writeFile(this.route, JSON.stringify(data, null, 2));
    } catch (error) {
      logError(error);
    }
  }
}

export default ArchivoDAO;
