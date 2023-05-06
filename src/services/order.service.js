import { carritoDao, ordenDao } from "../daos/index.js";
import { generatePurchaseDate } from "../utils/generatePurchaseDate.js";

class OrderService {
  constructor() {}

  async getAllOrdersByBuyerEmail(buyerEmail) {
    try {
      return await ordenDao.getAllOrdersByBuyerEmail(buyerEmail);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getOrderById(orderId) {
    try {
      return await ordenDao.list(orderId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createOrder(state, cartId) {
    try {
      const { email, products, total } = await carritoDao.list(cartId);
      const order = {
        products,
        state,
        purchaseDate: generatePurchaseDate(new Date(Date.now())),
        buyerEmail: email,
        total,
      };
      await carritoDao.deleteAllProductsCartById(cartId);
      return await ordenDao.save(order);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new OrderService();
