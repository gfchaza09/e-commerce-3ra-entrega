import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("productos", {
      timestamp: { type: Number, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      categoryId: { type: String, required: true },
      photoUrl: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProductosDaoMongoDb;
