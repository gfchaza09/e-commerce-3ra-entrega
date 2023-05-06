import { productosDao } from "../daos/index.js";
// import { Category } from "../models/Category.js";
import CartService from "./cart.service.js";

class ProductService {
  constructor() {}

  async getAllProducts() {
    try {
      return await productosDao.listAll();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductById(productId) {
    try {
      return await productosDao.list(productId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductsByCategoryName(categoryName) {
    try {
      return await productosDao.getProductsByCategoryName(categoryName);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      return await productosDao.save(product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateProductById(product, productId) {
    try {
      return await productosDao.update(product, productId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(productId) {
    try {
      await CartService.deleteProductOfAllCartsById(productId);
      return await productosDao.delete(productId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new ProductService();
