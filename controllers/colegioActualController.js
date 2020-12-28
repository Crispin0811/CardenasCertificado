const colegioActualModel = require("../models/colegioActualModel");

const getDatosCardenar = (req, res) => {
 res.render('datosIE')
};

module.exports = {
  getDatosCardenar,
};
