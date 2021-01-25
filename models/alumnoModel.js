const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Alumno = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  apellidoPaterno: {
    type: String,
    require: true,
  },
  apellidoMaterno: {
    type: String,
    require: true,
  },
  dni: {
    type: String,
    unique: true,
  },
  codEstudiante: {
    type: String,
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
