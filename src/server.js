import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy, ExtractJwt } from "passport-jwt";
import cors from "cors";

import config from "./config.js";
import { usuariosDao } from "./daos/index.js";
import { verifyPass } from "./utils/crypt.js";
// Importacion de Routers
import productosApiRouter from "./routers/api/productos.js";
import carritoApiRouter from "./routers/api/carrito.js";
import authWebRouter from "./routers/web/auth.js";

// Impostacion de loggers
import { logInfo, logWarning } from "./loggers/index.js";

//------------------------------------------------------------------------
// instancio servidor
const app = express();

// Passport

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      //Logica para validar si un usuario existe
      try {
        const users = await usuariosDao.listAll();
        const existeUsuario = users.find((usuario) => usuario.email == email);

        if (!existeUsuario) {
          return done(null, false, { message: "User not found" });
        } else {
          const match = await verifyPass(existeUsuario, password);

          if (!match) {
            return done(null, false, { message: "Wrong password" });
          }
          return done(null, existeUsuario, {
            message: "Logged in Successfully",
          });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.email);
});

passport.deserializeUser(async (email, done) => {
  const users = await usuariosDao.listAll();
  const existeUsuario = users.find((usuario) => usuario.email == email);
  done(null, existeUsuario);
});

passport.use(
  new Strategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromHeader("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//------------------------------------------------------------------------
// configuro servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create(config.mongodb),
    secret: "secreto",
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
// logging general

app.use((req, res, next) => {
  logInfo(`${req.method} ${req.url}`);
  next();
});

//--------------------------------------------
// rutas del servidor API
app.use(productosApiRouter);
app.use(carritoApiRouter);
//--------------------------------------------
// rutas del servidor web
app.use(authWebRouter);
//--------------------------------------------
// configuro el servidor

//--------------------------------------------
// logging casos no manejados

app.use("*", (req, res, next) => {
  logWarning(`${req.method} ${req.originalUrl} - Ruta inexistente`);
  next();
});

export default app;
