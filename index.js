const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser')
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("login");
});

//las rutas
app.use(require('./routes/todasRutas'))

//coneccion a la base de datos
require("./config/bd");

app.listen(3000, (e) => {
  if (e) {
    console.log(e);
  }
  console.log("corriendo en el puerto 3000");
});
