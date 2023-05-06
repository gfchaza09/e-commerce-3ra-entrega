import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { usuariosDao } from "../daos/index.js";
import { verifyPass } from "../utils/crypt.js";

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
