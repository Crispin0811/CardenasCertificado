const express = require("express");
const app = express();

const colegioActualController = require("../controllers/colegioActualController");
const este = require("../middleware/middleware");

app.post("/", este.prueba, colegioActualController.getDatosCardenar);

module.exports = app;
