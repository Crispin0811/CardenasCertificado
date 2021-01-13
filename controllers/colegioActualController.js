const Colegio = require("../models/colegioActualModel");

const getColegio = async (req, res) => {
  const colegio = await Colegio.findOne();

  res.render("datosIE", {
    tituloPagina: "Datos de la I.E.",
    colegio,
  });
};

const agregarColegioActual = async (req, res) => {
  let body = req.body;

  let colegio = new Colegio({
    nombre: body.nombre,
    ugel: body.ugel,
    codModular: body.codModular,
    region: body.region,
    provincia: body.provincia,
    distrito: body.distrito,
  });

  await colegio.save((err, colegioBd) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "ocurrio un error",
        err,
      });
    }
    if (!colegioBd) {
      return res.status(500).json({
        ok: false,
        mensaje: "ocurrio un error",
        err,
      });
    }

    res.json({
      ok: true,
      colegio: colegioBd,
    });
  });
};

module.exports = {
  getColegio,
  agregarColegioActual,
};
