const express = require("express");
const app = express();

app.use("/", require("./login"));
app.use("/colegio-actual", require("./colegioActual"));
app.use("/trabajador", require("./trabajador"));
app.use("/certificado", require("./certificado"));
app.use("/alumno", require("./alumno"));


module.exports = app;
