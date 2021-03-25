const express = require("express");
const app = express();

const alumnoController = require("../controllers/alumnoController");
const loginController = require("../controllers/loginController");

app.get("/", loginController.isAutenticado, alumnoController.formAlumno);
app.post("/", loginController.isAutenticado, alumnoController.agregarAlumno);

app.post(
  "/agregar-nota",
  loginController.isAutenticado,
  alumnoController.agregarNotas
);

app.get(
  "/verAlumno",
  loginController.isAutenticado,
  alumnoController.verAlumno
);

module.exports = app;
