const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Alumno = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre del Alumno es necesario"],
  },
  apellidoPaterno: {
    type: String,
    require: [true, "El apellido paterno del Alumno es necesario"],
  },
  apellidoMaterno: {
    type: String,
    require: [true, "El apellido materno del Alumno es necesario"],
  },
  dni: {
    type: String,
    require: false,
    unique: true,
  },
  codModular: {
    type: String,
    require: false,
    unique: true,
  },
  grados: [
    {
      type: Schema.Types.ObjectId,
      ref: "Grado",
    },
  ],
});

module.exports = mongoose.model("Alumno", Alumno);
