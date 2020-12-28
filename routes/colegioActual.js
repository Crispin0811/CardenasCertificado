const express = require("express");
const app = express();

const colegioActualController = require("../controllers/colegioActualController");


app.get("/", colegioActualController.getDatosCardenar);

module.exports = app;
