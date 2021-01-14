const express = require("express");
const app = express();
const trabajadorController =require('../controllers/trabajadorController')

app.get('/',trabajadorController.getTrabajadores)
app.get('/agregar',trabajadorController.verFormularioTrabajador)
app.post('/agregar',trabajadorController.agregarTrabajador)

//acctualizar trabajador
app.get('/editar/:id',trabajadorController.editarTrabajador)
app.post('/editar/:id',trabajadorController.actualizarTrabajador)


//eliminar Trabajador
app.delete('/:id',trabajadorController.eliminarTrabajador)




module.exports = app;
