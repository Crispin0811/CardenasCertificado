const express = require("express");
const app = express();

app.use("/colegio-actual", require("./colegioActual"));

module.exports = app;
