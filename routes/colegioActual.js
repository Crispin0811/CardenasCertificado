const express = require("express");
const app = express();

const datosCardenasController = require("../controllers/colegioActualController");

app.post("/", datosCardenasController.getDatosCardenar);

module.exports = app;
