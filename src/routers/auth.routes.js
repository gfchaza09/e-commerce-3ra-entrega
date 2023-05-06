import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { logError, logInfo } from "../loggers/index.js";
import userService from "../services/user.service.js";
import { sendMailTo } from "../utils/nodemailer.js";

const authWebRouter = new Router();

authWebRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        res.send({ status: 401, description: "Invalid credentials" });
        logError(error);
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET", {
          expiresIn: "1h",
        });

        return res.json({
          token,
          status: 200,
          email: user.email,
          avatar: user.avatar,
          nombre: user.nombre,
          cartId: user.cartId,
        });
      });
    } catch (error) {
      logError(error);
      return next(error);
    }
  })(req, res, next);
});

authWebRouter.post("/signup", async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (user) {
    res.send({ status: 409, description: "Email already in use" });
  } else {
    await userService.createUser(req.body);
    res.send({ status: 200, description: "User saved successfully" });

    try {
      const info = await sendMailTo(
        "Nuevo usuario registrado",
        `<h1 style="color: blue;">Nuevo usuario registrado en la base de datos de PekePatch</h1>
        <ul>
          <li>Email: ${req.body.email}</li>
          <li>Nombre: ${req.body.nombre}</li>
          <li>Edad: ${req.body.edad}</li>
          <li>Teléfono: +54 9 ${req.body.tel}</li>
          <li>Dirección: ${req.body.direccion}</li>
        </ul>
      `
      );
      logInfo("mail enviado", info);
    } catch (err) {
      logError(err);
    }
  }
});

export default authWebRouter;
