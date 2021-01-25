const express = require("express");
const app = express();

const colegioActualController = require("../controllers/colegioActualController");
const loginController = require("../controllers/loginController");

app.get("/", loginController.isAutenticado, colegioActualController.getColegio);
// app.get("/", colegioActualController.getColegio);
app.post("/", colegioActualController.agregarColegioActual);

module.exports = app;
