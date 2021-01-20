const PDFDocument = require("pdfkit");
const fs = require("fs");

const Alumno = require("../models/alumnoModel");

const getCertificado = (req, res) => {
  res.render("generarCerticado", {
    tituloPagina: "Generar Certificado",
  });
};

const buscarAlumno = async (req, res) => {
  let alumno;
  if (req.body.dni != "") {
    alumno = await Alumno.findOne({ dni: req.body.dni });
  } else if (req.body.codEstudiante != "") {
    alumno = await Alumno.findOne({ codEstudiante: req.body.codEstudiante });
  } else {
    alumno = await Alumno.findOne({
      nombre: req.body.nombre,
      apellidoPaterno: req.body.apellidoPater,
      apellidoMaterno: req.body.apellidoMater,
    });
  }

  if (!alumno) {
    // return res.json({
    //   mensaje: "segundo alumno",
    // });
    return res.render("generarCerticado", {
      tituloPagina: "Generar Certificado",
      error: "No hay Alumnos con ese tipo de busqueda",
    });
  }

  res.render("generarCerticado", {
    tituloPagina: "Generar Certificado",
    alumno,
  });
};

const imprimirCertificado = async (req, res) => {
  let alumno = await Alumno.findById(req.params.id);

  let ms = new Date().getMilliseconds();
  const doc = new PDFDocument();

  doc.pipe(
    fs.createWriteStream(
      `C:/Users/Kevin_CG/Desktop/certificados/output${ms}.pdf`
    )
  );
  doc
    // .font('fonts/PalatinoBold.ttf')
    .fontSize(25)
    .text(`alumno ${alumno.nombre}`, 100, 100);
  doc
    .moveDown()
    .rotate(270, { origin: [150, 200] })
    .fontSize(10)
    // x y
    .text("rotado", 100, 200);

  doc.end();

  res.render("generarCerticado", {
    tituloPagina: "Generar Certificado",
    alumno,
    exito: "El certificado se generó exitosamente",
  });
};

module.exports = {
  getCertificado,
  buscarAlumno,
  imprimirCertificado,
};
