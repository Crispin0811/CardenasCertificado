const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Curso = new Schema({
  nombre: {
    type: String,

    require: [true, "El nombre del colegio es necesario"],
  },
  nota: [
    {
      type: Number,
      require: [true, "El nombre del colegio es necesario"],
    },
  ],
});

module.exports = mongoose.model("Curso", Curso);
