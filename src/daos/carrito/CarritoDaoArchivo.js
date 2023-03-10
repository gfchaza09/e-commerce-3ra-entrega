import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
import { logError } from "../../loggers/index.js";

class CarritoDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("carrito.txt");
  }

  async save() {
    const carts = await this.listAll();

    try {
      let timestamp = Date.now();
      let id;
      carts.length === 0 ? (id = 1) : (id = carts[carts.length - 1].id + 1);
      const newCart = { products: [], id, timestamp };
      carts.push(newCart);
      await this.writeFile(carts);
      return newCart.id;
    } catch (error) {
      logError(error);
    }
  }

  async update(prod, id) {
    const carts = await this.listAll();
    try {
      const updatedCart = carts.find((cart) => cart.id === parseInt(id));
      if (updatedCart) {
        updatedCart.products = [...updatedCart.products, prod];
        await this.writeFile(carts);
        return updatedCart;
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }

  async deleteProductCart(id, prodId) {
    const carts = await this.listAll();
    try {
      const cart = carts.find((cart) => cart.id === parseInt(id));
      if (cart.products) {
        const prod = cart.products.find((prod) => prod.id === parseInt(prodId));
        if (prod) {
          cart.products = cart.products.filter(
            (prod) => prod.id !== parseInt(prodId)
          );
        }
        await this.writeFile(carts);
        return prod;
      }
    } catch (error) {
      logError(error);
    }
  }
}

export default CarritoDaoArchivo;
