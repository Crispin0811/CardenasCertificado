const express = require("express");
const app = express();
const loginController = require("../controllers/loginController");

app.get("/", loginController.login);
app.get("/cambiar-contrasena", loginController.cambiarContrasena);

app.post('/',loginController.iniciarSesion)

module.exports = app;
