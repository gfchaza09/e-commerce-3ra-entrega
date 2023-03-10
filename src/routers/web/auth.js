import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";

import config from "../../config.js";
import { logInfo, logError } from "../../loggers/index.js";
import { upload } from "../../middleware/multer.js";
import { usuariosDao } from "../../daos/index.js";
import { generateHashPassword } from "../../utils/crypt.js";

const authWebRouter = new Router();

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmail.email,
    pass: config.gmail.pass,
  },
});

authWebRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({
          token,
          status: 200,
          email: user.email,
          avatar: user.avatar,
          nombre: user.nombre,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authWebRouter.post("/signup", async (req, res) => {
  const { email, password, nombre, direccion, edad, tel } = req.body;

  const users = await usuariosDao.listAll();

  const newUsuario = users.find((usuario) => usuario.email == email);
  if (newUsuario) {
    res.send({ status: 409, description: "Email already in use" });
  } else {
    const newUser = {
      email,
      password: await generateHashPassword(password),
      nombre,
      direccion,
      edad,
      tel: `+549${tel}`,
      avatar:
        "https://img.freepik.com/vector-premium/icono-perfil-avatar_188544-4755.jpg?w=2000",
    };

    await usuariosDao.save(newUser);
    res.send({ status: 200, description: "User saved successfully" });

    const mailOptions = {
      from: "Pekepatch ecommerce",
      to: config.gmail.email,
      subject: "Nuevo usuario registrado",
      html: `<h1 style="color: blue;">Nuevo usuario registrado en la base de datos de PekePatch</h1>
        <ul>
          <li>Email: ${email}</li>
          <li>Nombre: ${nombre}</li>
          <li>Dirección: ${direccion}</li>
          <li>Edad: ${edad}</li>
          <li>Teléfono: +54 9 ${tel}</li>
        </ul>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      logInfo("mail enviado", info);
    } catch (err) {
      logError(err);
    }
  }
});

export default authWebRouter;
