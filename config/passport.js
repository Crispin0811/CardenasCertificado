const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Trabajador = require("../models/trabajadorModel");

passport.use(
  new localStrategy(
    {
      usernameField: "dni",
      passwordField: "contrasena",
    },
    async (dni, contrasena, done) => {
      try {
        const trabajador = await Trabajador.findOne({ dni: dni });
        const march = bcrypt.compareSync(contrasena, trabajador.contrasena);
        if (!march) {
          return done(null, false, {
            message: "Contraseña incorrecta",
          });
        }

        return done(null, trabajador);
      } catch (error) {
        return done(null, false, {
          message: "Esa cuenta no existe",
        });
      }
    }
  )
);

passport.serializeUser((trabajador, cb) => {
  cb(null, trabajador);
});

passport.deserializeUser((trabajador, cb) => {
  cb(null, trabajador);
});

module.exports = passport;
