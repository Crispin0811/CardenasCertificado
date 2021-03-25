const express = require("express");
const app = express();

const colegioActualController = require("../controllers/colegioActualController");
const loginController = require("../controllers/loginController");

app.get("/", loginController.isAutenticado, colegioActualController.getColegio);
app.post(
  "/",
  loginController.isAutenticado,
  colegioActualController.agregarColegioActual
);

module.exports = app;
