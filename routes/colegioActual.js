const express = require("express");
const app = express();

const colegioActualController = require("../controllers/colegioActualController");


app.get("/", colegioActualController.getColegio);
app.post("/", colegioActualController.agregarColegioActual);

module.exports = app;
