const getColegioActual = (req, res) => {
  res.render('datosIE',{
    tituloPagina: "Datos de la I.E.",
  })
};

module.exports = {
  getColegioActual,
};
