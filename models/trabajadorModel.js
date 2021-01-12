const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Trabajador = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre del Trabajaador es necesario"],
  },
  apellidoPaterno: {
    type: String,
    require: [true, "El apellido paterno del Trabajaador es necesario"],
  },
  apellidoMaterno: {
    type: String,
    require: [true, "El apellido materno del Trabajaador es necesario"],
  },
  rol: {
    type: String,
    require: true,
    default: "Secretaria",
  },
  dni: {
    type: String,
    require: true,
    default: "Secretaria",
  },
  contrasena: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model("Trabajador", Trabajador);
