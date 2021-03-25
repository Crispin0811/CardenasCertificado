const express = require("express");
const app = express();

const certificadoController = require("../controllers/certificadoController");
const loginController = require("../controllers/loginController");

app.get(
  "/",
  loginController.isAutenticado,
  certificadoController.getCertificado
);

app.post(
  "/buscar-alumno",
  loginController.isAutenticado,
  certificadoController.buscarAlumno
);

app.get(
  "/imprimir/:id",
  loginController.isAutenticado,
  certificadoController.imprimirCertificado
);

module.exports = app;
