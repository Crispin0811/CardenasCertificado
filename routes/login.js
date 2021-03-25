const express = require("express");
const app = express();
const loginController = require("../controllers/loginController");

const passport = require("passport");

app.get("/", loginController.formLogin);

app.post("/", loginController.iniciarSesion);

app.get(
  "/cerrar-sesion",
  loginController.isAutenticado,
  loginController.cerrarSesion
);

module.exports = app;
