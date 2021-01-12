const express = require("express");
const app = express();
const trabajadorController =require('../controllers/trabajadorController')

app.get('/',trabajadorController.getTrabajadores)
app.get('/agregar',trabajadorController.agregarTrabajador)




module.exports = app;
