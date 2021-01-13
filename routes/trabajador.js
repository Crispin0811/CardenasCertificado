const express = require("express");
const app = express();
const trabajadorController =require('../controllers/trabajadorController')

app.get('/',trabajadorController.getTrabajadores)
app.get('/agregar',trabajadorController.verFormularioTrabajador)
app.post('/agregar',trabajadorController.agregarTrabajador)




module.exports = app;
