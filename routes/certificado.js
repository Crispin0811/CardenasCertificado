const express = require("express");
const app = express();

const certificadoController =require('../controllers/certificadoController')

app.get("/", certificadoController.getCertificado);

app.post('/buscar-alumno',certificadoController.buscarAlumno)

app.get('/imprimir/:id',certificadoController.imprimirCertificado)


module.exports = app;
