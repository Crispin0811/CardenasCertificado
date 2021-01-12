const Trabajador = require("../models/trabajadorModel");

const login = (req, res) => {
  res.render("login", {
    tituloPagina: "Iniciar Sesión",
  });
};
const iniciarSesion = (req, res) => {
  const { dni } = req.body;
  const { contrasena } = req.body;
  res.render("partial/master", {
    tituloPagina: "Pagina Princial",
  });
};

const cambiarContrasena = (req, res) => {
  
  res.render("cambiarContrasena", {
    tituloPagina: "Cuenta",
  });
};

module.exports = {
  login,
  iniciarSesion,
  cambiarContrasena
};
