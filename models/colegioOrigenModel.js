const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const ColegioOrigen = new Schema({
  nombre: {
    type: String,
    unique: true,
    require: [true, "El nombre del colegio es necesario"],
  },
});

module.exports = mongoose.model("ColegioOrigen", ColegioOrigen);
