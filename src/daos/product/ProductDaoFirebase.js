import FirebaseDAO from "../../classes/FirebaseDAO.js";

class ProductDaoFirebase extends FirebaseDAO {
  constructor() {
    super("productos");
  }
}

export default ProductDaoFirebase;
