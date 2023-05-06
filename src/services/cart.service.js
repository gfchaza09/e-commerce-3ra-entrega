import { carritoDao } from "../daos/index.js";

class CartService {
  constructor() {}

  async getCartById(cartId) {
    try {
      return await carritoDao.list(cartId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createCart(cart) {
    try {
      return await carritoDao.save(cart);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProductOfACart(product, cartId, quantity) {
    try {
      let { products, total } = await this.getCartById(cartId);
      const productInCart = products.find((item) =>
        item._id.equals(product._id)
      );
      total = total + product.price * quantity;
      if (!productInCart) {
        product.inCart = quantity;
        return await carritoDao.createProductOfACart(cartId, product, total);
      }
      product.inCart = productInCart.inCart + quantity;
      return await carritoDao.createProductOfACart(cartId, product, total);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteCartById(cartId) {
    try {
      return await carritoDao.delete(cartId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductByCartId(cartId, prodId) {
    try {
      return await carritoDao.deleteProductCart(cartId, prodId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductOfAllCartsById(prodId) {
    try {
      return await carritoDao.deleteProductOfAllCartsById(prodId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAllProductsCartById(cartId) {
    try {
      return await carritoDao.deleteAllProductsCartById(cartId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new CartService();
