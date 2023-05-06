import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";
import { logError, logWarning } from "../loggers/index.js";

class CartController {
  constructor() {}

  async getProductsByCartId(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const cart = await CartService.getCartById(id);
      if (!cart) {
        res.status(404);
        res.send({ status: 404, description: "Cart not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      res.status(200);
      res.json(cart);
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async createCart(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
      res.status(422);
      res.send({
        status: 422,
        description:
          "No se pudo obtener los atributos del producto correctamente",
      });
      logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    } else {
      try {
        const newCart = await CartService.createCart(cart);
        res.status(201);
        res.json({ newCartId: newCart._id });
      } catch (err) {
        res.status(500);
        res.send({ status: 500, description: "Internal Server Error" });
        logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      }
    }
  }

  async createProductOfACart(req, res) {
    try {
      const {
        params: { cartId, prodId },
        body: { quantity },
      } = req;
      const product = await ProductService.getProductById(prodId);
      const cart = await CartService.getCartById(cartId);
      if (!product) {
        res.status(404);
        res.send({ status: 404, description: "Product not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      if (!cart) {
        res.status(404);
        res.send({ status: 404, description: "Cart not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      await CartService.createProductOfACart(product, cartId, quantity);
      res.status(302);
      res.json({ productAdd: product });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async deleteCartById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const cart = await CartService.getCartById(id);
      if (!cart) {
        res.status(404, "Cart Not Found");
        res.send({ status: 404, description: "Cart not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      await CartService.deleteCartById(id);
      res.status(200);
      res.send(`Carrito Eliminado (id: ${id})`);
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async deleteProductById(req, res) {
    try {
      const {
        params: { cartId, prodId },
      } = req;
      const product = await ProductService.getProductById(prodId);
      const cart = await CartService.getCartById(cartId);
      if (!product) {
        res.status(404);
        res.send({ status: 404, description: "Product not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      if (!cart) {
        res.status(404);
        res.send({ status: 404, description: "Cart not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      await CartService.deleteProductByCartId(cartId, prodId);
      res.status(302);
      res.send({ status: 302, description: `Producto Eliminado del Carrito` });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async deleteAllProductsCartById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const cart = await CartService.getCartById(id);
      if (!cart) {
        res.status(404);
        res.send({ status: 404, description: "Cart not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      await CartService.deleteAllProductsCartById(id);
      res.status(200);
      res.send({ status: 200, description: `Carrito Vaciado` });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }
}

export default new CartController();
