const colegioActualModel = require("../models/colegioActualModel");

const getDatosCardenar = (req, res) => {
  const body = req.body;
  console.log(body);
  res.send("ok");
};

module.exports = {
  getDatosCardenar,
};
