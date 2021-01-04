const colegioActualModel = require("../models/colegioActualModel");

const getDatosCardenar = (req, res) => {
 res.render('listaTrabajadores')
};

module.exports = {
  getDatosCardenar,
};
