import { Router } from "express";
import { createTransport } from "nodemailer";
import twilio from "twilio";

import config from "../../config.js";
import { logError, logInfo } from "../../loggers/index.js";
import { carritoDao as carritoApi } from "../../daos/index.js";

const carritoApiRouter = new Router();

const accountSid = config.twilio.accountsid;
const authToken = config.twilio.authToken;

const client = twilio(accountSid, authToken);

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmail.email,
    pass: config.gmail.pass,
  },
});

carritoApiRouter.post("/api/carrito", async (req, res) => {
  let idCarritoNuevo = await carritoApi.save();
  res.send({ idCarrito: idCarritoNuevo });
});

carritoApiRouter.delete("/api/carrito/:id", async (req, res) => {
  let { id } = req.params;
  let carrito = await carritoApi.delete(id);
  if (carrito) {
    res.send("Carrito Eliminado");
  } else {
    res.json({ error: "carrito no encontrado" });
  }
});

//--------------------------------------------------
// router de productos en carrito

carritoApiRouter.get("/api/carrito/:id/productos", async (req, res) => {
  let { id } = req.params;
  const carritoProductos = await carritoApi.list(id);
  if (carritoProductos) {
    res.json(carritoProductos);
  } else {
    res.json({ error: "carrito no encontrado" });
  }
});

carritoApiRouter.post("/api/carrito/:id/productos", async (req, res) => {
  let { id } = req.params;
  let carritoProductos = await carritoApi.update(req.body, id);
  if (carritoProductos) {
    res.send("Carrito Modificado");
  } else {
    res.json({ error: "carrito no encontrado" });
  }
});

carritoApiRouter.delete(
  "/api/carrito/:id/productos/:id_prod",
  async (req, res) => {
    let { id, id_prod } = req.params;
    let carrito = await carritoApi.deleteProductCart(id, id_prod);
    if (carrito) {
      res.send("Producto Eliminado");
    } else {
      res.json({ error: "producto no encontrado" });
    }
  }
);

carritoApiRouter.post("/api/carrito/comprar", async (req, res) => {
  let { buyer, id, items, total } = req.body;
  res.send({ status: 200, description: "Buy finished" });
  const mailOptions = {
    from: "Pekepatch ecommerce",
    to: config.gmail.email,
    subject: `Nuevo pedido de ${buyer.lastName}, ${buyer.firstName} (${buyer.email})`,
    html: `<h1 style="color: blue;">Lista de productos</h1>
      <ul>
        ${items.map(
          (item) =>
            `<li>${item.name}: Cantidad(${item.quantity}) Precio(unidad: $${item.price})</li>`
        )}
      </ul>
      <h2>Total: $${total}</h2>
      <h3>Orden de compra: ${id}</h3>
    `,
  };

  const whatsappOptions = {
    body: `Nuevo pedido de ${buyer.lastName}, ${buyer.firstName} (${
      buyer.email
    }) \n
    Lista de productos: \n
    ${items.map(
      (item) =>
        `${item.name}: Cantidad(${item.quantity}) Precio(unidad: $${item.price}) \n`
    )}
    
    Total: $${total}
    Orden de compra: ${id}
    `,
    from: "whatsapp:" + config.twilio.whatsappTwilio,
    to: "whatsapp:" + config.twilio.whatsappAdmin,
  };

  const smsOptions = {
    body: `Su pedido ha sido recibido: \n
    Lista de productos: \n
    ${items.map(
      (item) =>
        `${item.name}: Cantidad(${item.quantity}) Precio(unidad: $${item.price}) \n`
    )}
    
    Total: $${total}
    Orden de compra: ${id}
    `,
    from: config.twilio.smsTwilio,
    to: "+54" + buyer.phoneNumber,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logInfo("mail enviado", info);
  } catch (err) {
    logError(err);
  }

  try {
    const message = await client.messages.create(whatsappOptions);
    logInfo(message);
  } catch (err) {
    logError(err);
  }

  try {
    const message = await client.messages.create(smsOptions);
    logInfo(message);
  } catch (err) {
    logError(err);
  }
});

carritoApiRouter.get("/favicon.ico", (req, res) => res.send(""));

export default carritoApiRouter;
