const express = require("express");
const app = express();

app.use("/iniciar-sesion", require("./login"));
app.use("/", require("./colegioActual"));
app.use("/trabajador", require("./trabajador"));
app.use("/certificado", require("./certificado"));
app.use("/alumno/", require("./alumno"));


module.exports = app;
