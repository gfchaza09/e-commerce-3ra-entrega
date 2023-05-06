// Archivo DAO
import ProductDaoArchivo from "./product/ProductDaoArchivo.js";
import CartDaoArchivo from "./cart/CartDaoArchivo.js";

// Memoria DAO
import ProductDaoMem from "./product/ProductDaoMem.js";
import CartDaoMem from "./cart/CartDaoMem.js";

// Firebase DAO
import ProductDaoFirebase from "./product/ProductDaoFirebase.js";
import CartDaoFirebase from "./cart/CartDaoFirebase.js";

// Mongo DAO
import ProductDaoMongoDb from "./product/ProductDaoMongoDb.js";
import CartDaoMongoDb from "./cart/CartDaoMongoDb.js";
import OrderDaoMongoDb from "./order/OrderDaoMongoDb.js";
import UserDaoMongoDb from "./user/UserDaoMongoDb.js";
import MessageDaoMongoDb from "./message/MessageDaoMongoDb.js";

let productosDao = null;
let carritoDao = null;
let usuariosDao = null;
let mensajesDao = null;
let ordenDao = null;

const PERS = process.env.PERS || "mongodb";

switch (PERS) {
  case "archive":
    productosDao = ProductDaoArchivo.getInstance();
    carritoDao = CartDaoArchivo.getInstance();
    break;

  case "memory":
    productosDao = ProductDaoMem.getInstance();
    carritoDao = CartDaoMem.getInstance();
    break;

  case "firebase":
    productosDao = ProductDaoFirebase.getInstance();
    carritoDao = CartDaoFirebase.getInstance();
    break;

  case "mongodb":
    productosDao = ProductDaoMongoDb.getInstance();
    carritoDao = CartDaoMongoDb.getInstance();
    ordenDao = OrderDaoMongoDb.getInstance();
    mensajesDao = MessageDaoMongoDb.getInstance();
    usuariosDao = UserDaoMongoDb.getInstance();
    break;
}

export { productosDao, carritoDao, usuariosDao, mensajesDao, ordenDao };
