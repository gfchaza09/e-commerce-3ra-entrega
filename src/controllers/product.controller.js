import ProductService from "../services/product.service.js";
import { logError, logWarning } from "../loggers/index.js";

class ProductController {
  constructor() {}

  async getProducts(req, res) {
    const {
      params: { id },
    } = req;
    if (id) {
      try {
        const product = await ProductService.getProductById(id);
        if (!product) {
          res.status(404);
          res.send({ status: 404, description: "Product not found" });
          logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          return;
        }
        res.status(200);
        res.json(product);
      } catch (err) {
        res.status(500);
        res.send({ status: 500, description: "Internal Server Error" });
        logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      }
    } else {
      try {
        const products = await ProductService.getAllProducts();
        if (!products) {
          res.status(404);
          res.send({ status: 404, description: "Products not found" });
          logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          return;
        }
        res.status(200);
        res.json(products);
      } catch (err) {
        res.status(500);
        res.send({ status: 500, description: "Internal Server Error" });
        logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      }
    }
  }

  async getProductsByCategoryName(req, res) {
    const {
      params: { category },
    } = req;
    try {
      const products = await ProductService.getProductsByCategoryName(
        category.toLowerCase()
      );
      if (!products) {
        res.status(404);
        res.send({ status: 404, description: "Products not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      res.status(200);
      res.json(products);
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async createProduct(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
      res.status(422);
      res.send({
        status: 422,
        description:
          "No se pudo obtener los atributos del producto correctamente",
      });
      logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    } else {
      try {
        const createdProduct = await ProductService.createProduct(body);
        res.status(201);
        res.json({ createdProduct });
      } catch (err) {
        res.status(500);
        res.send({ status: 500, description: "Internal Server Error" });
        logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      }
    }
  }

  async updateProduct(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const newProduct = req.body;
      const product = await ProductService.getProductById(id);
      if (!product) {
        res.status(404);
        res.send({ status: 404, description: "Product not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      const updatedProduct = await ProductService.updateProductById(
        newProduct,
        id
      );
      res.status(200);
      res.json({ updatedProduct });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async deleteProductById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const product = await ProductService.getProductById(id);
      if (!product) {
        res.status(404);
        res.send({ status: 404, description: "Product not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      const deletedProduct = await ProductService.deleteProductById(id);
      res.status(200);
      res.json({ deletedProduct });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }
}

export default new ProductController();
