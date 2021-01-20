const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const Grado = new Schema({
  comportamiento: {
    type: String,
    require: [true, "La nota del comportamiento es necesario"],
  },
  anioLectivo: {
    type: String,
    require: [true, "El año lectivo es necesario"],
  },
  grado: {
    type: String,
    require: [true, "El grado es necesario"],
  },
  colOrigen: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Grado", Grado);
