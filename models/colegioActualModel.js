const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let ColegioActual = new Schema({
  nombre: {
    type: String,
    unique: true,
    require: [true, "El nombre del colegio es necesario"],
  },
  ugel: {
    type: String,
    require: [true, "El nombre de la UGEL es necesario"],
  },
  codModular: {
    type: String,
    require: [true, "El Codigo Modular del colegio es necesario"],
  },
  region: {
    type: String,
    require: [true, "El departamento del colegio es necesario"],
  },
  provincia: {
    type: String,
    require: [true, "La provincia del colegio es necesario"],
  },
  distrito: {
    type: String,
    require: [true, "El distrito del colegio es necesario"],
  },
});

module.exports = mongoose.model("DatosCardenas", ColegioActual);
