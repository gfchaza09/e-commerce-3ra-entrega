import MongodbDAO from "../../classes/MongodbDAO.js";
import { Cart } from "../../models/Cart.js";
import { Product } from "../../models/Product.js";
import { logError } from "../../loggers/index.js";

class CartDaoMongoDb extends MongodbDAO {
  constructor() {
    super(Cart);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartDaoMongoDb();
    }
    return this.instance;
  }

  async createProductOfACart(cartId, product, total) {
    try {
      const { products } = await this.coleccion.findOne(
        { _id: cartId },
        {
          products: { $elemMatch: { _id: product._id } },
        }
      );
      if (products.length > 0) {
        await this.deleteProductCart(cartId, product._id);
      }
      return await this.coleccion.findByIdAndUpdate(
        { _id: cartId },
        { $push: { products: product }, total }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductCart(id, prodId) {
    try {
      const cart = await this.coleccion.findById(id);
      if (cart) {
        const prod = cart.products.find(
          (prod) => prod._id.toString() === prodId.toString()
        );
        if (prod) {
          const { products } = await this.coleccion.findOne(
            { _id: id },
            {
              products: { $elemMatch: { _id: prodId } },
            }
          );
          let { total } = await this.list(id);
          const newTotal = total - products[0].price * products[0].inCart;
          await this.coleccion.updateOne(
            { _id: id },
            {
              $pull: { products: { _id: prodId } },
              $set: { total: newTotal },
            }
          );
          return products[0];
        }
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }

  async deleteProductOfAllCartsById(productId) {
    try {
      const product = await Product.findById(productId);
      await this.coleccion.updateMany({
        $pull: { products: { _id: productId } },
      });
      // TODO: actualizar el precio total del carrito al eliminar los productos de los carritos
      return product;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteAllProductsCartById(cartId) {
    try {
      return await this.coleccion.findByIdAndUpdate(
        { _id: cartId },
        { $set: { products: [] }, total: 0 }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default CartDaoMongoDb;
