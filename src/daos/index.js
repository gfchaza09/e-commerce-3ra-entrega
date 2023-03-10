let productosDao;
let carritoDao;
let usuariosDao;

switch ("mongodb") {
  case "json":
    const { default: ProductosDaoArchivo } = await import(
      "./productos/ProductosDaoArchivo.js"
    );
    const { default: CarritoDaoArchivo } = await import(
      "./carrito/CarritoDaoArchivo.js"
    );

    productosDao = new ProductosDaoArchivo();
    carritoDao = new CarritoDaoArchivo();
    break;
  case "firebase":
    const { default: ProductosDaoFirebase } = await import(
      "./productos/ProductosDaoFirebase.js"
    );
    const { default: CarritoDaoFirebase } = await import(
      "./carrito/CarritoDaoFirebase.js"
    );

    productosDao = new ProductosDaoFirebase();
    carritoDao = new CarritoDaoFirebase();
    break;
  case "mongodb":
    const { default: ProductosDaoMongoDb } = await import(
      "./productos/ProductosDaoMongoDb.js"
    );
    const { default: CarritoDaoMongoDb } = await import(
      "./carrito/CarritoDaoMongoDb.js"
    );
    const { default: UsuariosDaoMongoDb } = await import(
      "./usuarios/UsuariosDaoMongoDb.js"
    );

    productosDao = new ProductosDaoMongoDb();
    carritoDao = new CarritoDaoMongoDb();
    usuariosDao = new UsuariosDaoMongoDb();
    break;
  case "memory":
    const { default: ProductosDaoMem } = await import(
      "./productos/ProductosDaoMem.js"
    );
    const { default: CarritoDaoMem } = await import(
      "./carrito/CarritoDaoMem.js"
    );

    productosDao = new ProductosDaoMem();
    carritoDao = new CarritoDaoMem();
    break;
  default:
    break;
}

export { productosDao, carritoDao, usuariosDao };
