import OrderService from "../services/order.service.js";
import { sendMailTo } from "../utils/nodemailer.js";
import { logError, logInfo, logWarning } from "../loggers/index.js";
import { sendSMSTo, sendWhatsappTo } from "../utils/twilio.js";
import CartService from "../services/cart.service.js";

class OrderController {
  constructor() {}

  async getAllOrdersByBuyerEmail(req, res) {
    try {
      const { email } = req.params;
      const orders = await OrderService.getAllOrdersByBuyerEmail(email);
      if (!orders) {
        res.status(404);
        res.send({ status: 404, description: "Orders not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      res.status(200);
      res.json({ orders });
    } catch (err) {
      res.status(500, "Internal Server Error");
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async getOrderById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const order = await OrderService.getOrderById(id);
      if (!order) {
        res.status(404);
        res.send({ status: 404, description: "Order not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      res.status(200);
      res.json({ order });
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }

  async createOrder(req, res) {
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
        const { state, cartId } = body;
        const cart = await CartService.getCartById(cartId);
        const newOrder = await OrderService.createOrder(state, cartId);
        try {
          const info = await sendMailTo(
            "Compraste en PekePatch",
            `<h1>Tu compra se ha realizado correctamente.</h1>
            <h2 style="color: blue;">Lista de productos</h2>
              <ul>
                ${cart.products.map(
                  (item) =>
                    `<li>${item.name}: Cantidad(${item.inCart}) Precio(unidad: $${item.price})</li>`
                )}
              </ul>
              <h3>Total: $${cart.total}</h3>
              <h4>Orden de compra: ${cart._id.toString()}</h4>
            `,
            cart.email
          );
          logInfo("mail enviado", info);
        } catch (err) {
          logError(err);
        }

        try {
          const info = await sendMailTo(
            `Nuevo pedido de ${cart.email}`,
            `<h1 style="color: blue;">Lista de productos</h1>
              <ul>
                ${cart.products.map(
                  (item) =>
                    `<li>${item.name}: Cantidad(${item.inCart}) Precio(unidad: $${item.price})</li>`
                )}
              </ul>
              <h2>Total: $${cart.total}</h2>
              <h3>Orden de compra: ${cart._id.toString()}</h3>
            `
          );
          logInfo("mail enviado", info);
        } catch (err) {
          logError(err);
        }

        try {
          const message = await sendWhatsappTo(`Nuevo pedido de ${
            cart.email
          }) \n
          Lista de productos: \n
          ${cart.products.map(
            (item) =>
              `${item.name}: Cantidad(${item.inCart}) Precio(unidad: $${item.price}) \n`
          )}
          
          Total: $${cart.total}
          Orden de compra: ${cart._id.toString()}
          `);
          logInfo("whatsapp enviado", message);
        } catch (err) {
          logError(err);
        }

        try {
          const message = await sendSMSTo(
            `Su pedido ha sido recibido: \n
              Lista de productos: \n
              ${cart.products.map(
                (item) =>
                  `${item.name}: Cantidad(${item.inCart}) Precio(unidad: $${item.price}) \n`
              )}
              
              Total: $${cart.total}
              Orden de compra: ${cart._id.toString()}
            `,
            // Se debe utilizar un número registrado en Twilio
            3885470980
          );
          logInfo("sms enviado", message);
        } catch (err) {
          logError(err);
        }
        res.status(200);
        res.json({ status: 200, description: "Buy finished", newOrder });
      } catch (err) {
        res.status(500);
        res.send({ status: 500, description: "Internal Server Error" });
        logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      }
    }
  }
}

export default new OrderController();
