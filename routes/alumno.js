const express = require("express");
const app = express();

const alumnoController = require('../controllers/alumnoController')

app.get('/',alumnoController.formAlumno)
app.post('/',alumnoController.agregarAlumno)

app.get('/verAlumno',alumnoController.verAlumno)


module.exports = app;