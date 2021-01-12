const express = require("express");
const app = express();

const alumnoController = require('../controllers/alumnoController')

app.get('/',alumnoController.getAlumno)

module.exports = app;