import MemoriaDAO from "../../classes/MemoriaDAO.js";
import { logError } from "../../loggers/index.js";

class CartDaoMem extends MemoriaDAO {
  async save() {
    try {
      let timestamp = Date.now();
      let id;
      this.productos.length === 0
        ? (id = 1)
        : (id = this.productos[this.productos.length - 1].id + 1);
      const newCart = { products: [], id, timestamp };
      this.productos.push(newCart);
      return newCart.id;
    } catch (error) {
      logError(error);
    }
  }
  async update(prod, id) {
    try {
      const updatedCart = this.productos.find(
        (cart) => cart.id === parseInt(id)
      );
      if (updatedCart) {
        updatedCart.products = [...updatedCart.products, prod];
        return updatedCart;
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }
  async deleteProductCart(id, prodId) {
    const carts = this.productos;
    try {
      const cart = this.productos.find((cart) => cart.id === parseInt(id));
      if (cart.products) {
        const prod = cart.products.find((prod) => prod.id === parseInt(prodId));
        if (prod) {
          cart.products = cart.products.filter(
            (prod) => prod.id !== parseInt(prodId)
          );
        }
        return prod;
      }
    } catch (error) {
      logError(error);
    }
  }
}

export default CartDaoMem;
