import { Router } from "express";
import passport from "passport";

import { productosDao as productosApi } from "../../daos/index.js";

const productosApiRouter = new Router();

productosApiRouter.get("/api/productos", async (req, res) => {
  const productos = await productosApi.listAll();
  res.json(productos);
});

productosApiRouter.get("/api/productos/:id", async (req, res) => {
  let { id } = req.params;
  const producto = await productosApi.list(id);
  if (producto) {
    res.json(producto);
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

productosApiRouter.post(
  "/api/productos",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let idProductoNuevo = await productosApi.save(req.body);
    res.send({ productoNuevo: idProductoNuevo });
  }
);

productosApiRouter.put(
  "/api/productos/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { id } = req.params;
    let producto = await productosApi.update(req.body, id);
    if (producto) {
      res.send("Producto Modificado");
    } else {
      res.json({ error: "producto no encontrado" });
    }
  }
);

productosApiRouter.delete(
  "/api/productos/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { id } = req.params;
    let producto = await productosApi.delete(id);
    if (producto) {
      res.send("Producto Eliminado");
    } else {
      res.json({ error: "producto no encontrado" });
    }
  }
);

productosApiRouter.get("/favicon.ico", (req, res) => res.send(""));

export default productosApiRouter;
