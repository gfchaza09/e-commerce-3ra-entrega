import ArchivoDAO from "../../classes/ArchivoDAO.js";

class ProductDaoArchivo extends ArchivoDAO {
  constructor() {
    super("productos.txt");
  }
}

export default ProductDaoArchivo;
