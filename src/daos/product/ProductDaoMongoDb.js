import MongodbDAO from "../../classes/MongodbDAO.js";
import { Product } from "../../models/Product.js";

class ProductDaoMongoDb extends MongodbDAO {
  constructor() {
    super(Product);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductDaoMongoDb();
    }
    return this.instance;
  }

  async getProductsByCategoryName(categoryName) {
    try {
      const products = await this.coleccion.find({ categoryId: categoryName });
      if (products.length === 0) {
        return null;
      }
      return products;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default ProductDaoMongoDb;
