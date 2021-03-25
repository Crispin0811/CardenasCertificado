const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const getStream = require("get-stream");

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
  const pdfStream = await generatePdf(alumno);

  res
    .writeHead(200, {
      "Content-Length": Buffer.byteLength(pdfStream),
      "Content-Type": "application/pdf",
      "Content-disposition": `attachment;filename=${alumno.apellidoPaterno}-certificado.pdf`,
    })
    .end(pdfStream);
};

generatePdf = async (alumno) => {
  try {
    const doc = new PDFDocument();

    doc
      .fontSize(25)
      .text(
        `es ${alumno.nombre} con apellido ${alumno.apellidoPaterno}`,
        100,
        100
      );

    doc.pipe(fs.createWriteStream(path.join(__dirname, `../pdf/pdf.pdf`)));

    doc.end();

    const pdfStream = await getStream.buffer(doc);

    return pdfStream;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getCertificado,
  buscarAlumno,
  imprimirCertificado,
};
