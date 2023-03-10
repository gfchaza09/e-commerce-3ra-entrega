import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";
import { logError } from "../../loggers/index.js";

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carrito");
  }

  async save() {
    try {
      const docRef = await this.coleccion.add({
        products: [],
        timestamp: Date.now(),
      });
      return docRef.id;
    } catch (error) {
      logError(error);
    }
  }

  async update(prod, id) {
    try {
      const docRef = this.coleccion.doc(id);
      const products = await docRef.get();
      const res = await docRef.set({
        products: [...products.data().products, prod],
        timestamp: products.data().timestamp,
      });
      if (res) {
        return res;
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }

  async deleteProductCart(id, prodId) {
    try {
      const docRef = this.coleccion.doc(id);
      const productsDoc = await docRef.get();
      let products = productsDoc.data().products;
      if (docRef) {
        const prod = products.find((prod) => prod.id === parseInt(prodId));
        if (prod) {
          let newProducts = products.filter(
            (prod) => prod.id !== parseInt(prodId)
          );
          const res = await docRef.set({
            products: newProducts,
            timestamp: productsDoc.data().timestamp,
          });
          return res;
        }
      } else {
        return null;
      }
    } catch (error) {
      logError(error);
    }
  }
}

export default CarritosDaoFirebase;
