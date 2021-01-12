const PDFDocument = require("pdfkit");
const fs = require("fs");

// Create a document

const getDatosCardenar = (req, res) => {
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
    .text("Some text with an embedded font!", 100, 100);
  doc
    .moveDown()
    .rotate(270, { origin: [150, 200] })
    .fontSize(10)
    // x y
    .text("rotado", 100, 200);

  doc.end();

  res.render("agregarAlumno");
};

module.exports = {
  getDatosCardenar,
};
