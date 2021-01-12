const express = require("express");
const app = express();

const certificadoController =require('../controllers/certificadoController')

app.get("/", certificadoController.getCertificado);

module.exports = app;
