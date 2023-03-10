import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import { logError } from "../../loggers/index.js";

class CarritoDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", {
      products: { type: [], required: true },
      timestamp: { type: Number, required: true },
    });
  }

  async save(carrito = { products: [] }) {
    return super.save(carrito);
  }

  async update(prod, id) {
    try {
      const updatedProduct = await this.coleccion.findById(id);
      if (updatedProduct) {
        const result = await this.coleccion.findOneAndUpdate(
          { _id: id },
          {
            products: [...updatedProduct.products, prod],
            timestamp: Date.now(),
          },
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

  async deleteProductCart(id, prodId) {
    try {
      const deletedProduct = await this.coleccion.findById(id);
      if (deletedProduct) {
        const prod = deletedProduct.products.find(
          (prod) => prod.id === parseInt(prodId)
        );
        if (prod) {
          let newProducts = deletedProduct.products.filter(
            (prod) => prod.id !== parseInt(prodId)
          );
          const result = await this.coleccion.findOneAndUpdate(
            { _id: id },
            {
              products: newProducts,
              timestamp: Date.now(),
            },
            { new: true }
          );
          return result;
        }
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }
}

export default CarritoDaoMongoDb;
