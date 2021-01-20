const express = require("express");
const app = express();
const loginController = require("../controllers/loginController");

app.get("/", loginController.formLogin);
//usando PASSPORT
app.post('/',loginController.iniciarSesion)

app.get("/cambiar-contrasena", loginController.cambiarContrasena);
app.get("/cerrar-sesion", loginController.cerrarSesion);


module.exports = app;
