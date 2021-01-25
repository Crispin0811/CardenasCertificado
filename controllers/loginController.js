const Trabajador = require("../models/trabajadorModel");
const passport = require("passport");

const formLogin = (req, res) => {
  res.render("login", {
    tituloPagina: "Iniciar Sesión",
    errores: res.locals.errores,
  });
};
const iniciarSesion = (req, res, next)=>{
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      //   return res.redirect("/iniciar-sesion");
      return res.render("login", {
        tituloPagina: "Iniciar Sesión",
        error: "DNI o Contraseña invalida",
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      res.cookie("idTrabajador", user._id);
      return res.redirect("/");
    });
  })(req, res, next);
}

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

module.exports = {
  formLogin,
  iniciarSesion,
  cerrarSesion,
  isAutenticado,
};
