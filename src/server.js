import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import config from "./config/config.js";
// Importacion de Router
import router from "./routers/index.routes.js";

// Importacion de loggers
import { logInfo, logWarning } from "./loggers/index.js";

import "./middleware/passport.js";

//------------------------------------------------------------------------
// instancio servidor
const app = express();

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
// Router

app.use(router);

//--------------------------------------------
// logging casos no manejados

app.use("*", (req, res, next) => {
  logWarning(`${req.method} ${req.originalUrl} - Ruta inexistente`);
  next();
});

export default app;
