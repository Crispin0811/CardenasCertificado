const PDFDocument = require("pdfkit");
const fs = require("fs");

const Alumno = require("../models/alumnoModel");

const getCertificado = (req, res) => {
  res.render("generarCerticado", {
    tituloPagina: "Generar Certificado",
  });
};

const buscarAlumno = async (req, res) => {
  let alumnos;
  if (req.body.dni != "") {
    alumnos = await Alumno.findOne({ dni: req.body.dni });
  } else if (req.body.codEstudiante != "") {
    alumnos = await Alumno.findOne({ codEstudiante: req.body.codEstudiante });
  } else {
    alumnos = await Alumno.find({
      nombre: req.body.nombre,
      apellidoPaterno: req.body.apellidoPater,
      apellidoMaterno: req.body.apellidoMater,
    });
  }

  if (!alumnos) {
    return res.render("generarCerticado", {
      tituloPagina: "Generar Certificado",
      error: "No hay Alumnos con ese tipo de busqueda",
    });
  }

  res.render("generarCerticado", {
    tituloPagina: "Generar Certificado",
    alumnos,
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
    .fontSize(12)
    .text(".", 100, 100);
  doc.fontSize(12).text(".", 10, 10);
  doc.fontSize(12).text(".", 20, 20);
  doc.fontSize(12).text("12", 20, 20);
  doc.fontSize(14).text("14", 50, 20);
  doc
    .rotate(270, { origin: [150, 70] })
    .fontSize(12)
    // x y
    .text(".rotado1", 100, 100);
  doc
    // .rotate(270, { origin: [150, 70] })
    .fontSize(12)
    // x y
    .text(".rotado2", 150, 100);
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
