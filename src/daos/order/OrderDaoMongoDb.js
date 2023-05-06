import { Order } from "../../models/Order.js";
import MongodbDAO from "../../classes/MongodbDAO.js";

class OrderDaoMongoDb extends MongodbDAO {
  constructor() {
    super(Order);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new OrderDaoMongoDb();
    }
    return this.instance;
  }

  async getAllOrdersByBuyerEmail(buyerEmail) {
    try {
      return await this.coleccion.find({ buyerEmail: buyerEmail });
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default OrderDaoMongoDb;
