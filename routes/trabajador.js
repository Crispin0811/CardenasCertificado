const express = require("express");
const app = express();
const trabajadorController = require("../controllers/trabajadorController");
const loginController = require("../controllers/loginController");

app.get(
  "/",
  loginController.isAutenticado,
  trabajadorController.getTrabajadores
);
app.get(
  "/agregar",
  loginController.isAutenticado,
  trabajadorController.verFormularioTrabajador
);
app.post(
  "/agregar",
  loginController.isAutenticado,
  trabajadorController.agregarTrabajador
);

//acctualizar trabajador
app.get(
  "/editar/:id",
  loginController.isAutenticado,
  trabajadorController.editarTrabajador
);
app.post(
  "/editar/:id",
  loginController.isAutenticado,
  trabajadorController.actualizarTrabajador
);

//eliminar Trabajador
app.delete(
  "/:id",
  loginController.isAutenticado,
  trabajadorController.eliminarTrabajador
);

app.get(
  "/cambiar-contrasena",
  loginController.isAutenticado,
  trabajadorController.formCambiarContrasena
);
app.post(
  "/cambiar-contrasena",
  loginController.isAutenticado,
  trabajadorController.cambiarContrasena
);

module.exports = app;
