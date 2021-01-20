const Trabajador = require("../models/trabajadorModel");
const passport = require("passport");

const formLogin = (req, res) => {
  res.render("login", {
    tituloPagina: "Iniciar Sesión",
    errores: res.locals.errores,
  });
};
const iniciarSesion = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "El DNI y la contraseña son necesarios",
});

const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};

const isAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/iniciar-sesion");
};

const cambiarContrasena = (req, res) => {
  res.render("cambiarContrasena", {
    tituloPagina: "Cuenta",
  });
};

module.exports = {
  formLogin,
  iniciarSesion,
  cambiarContrasena,
  cerrarSesion,
  isAutenticado,
};
