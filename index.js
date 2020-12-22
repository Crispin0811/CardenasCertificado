const express = require("express");
const app = express();
const path = require('path')
app.use(express.static("public"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname , '../public')));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("login");
});

app.listen(3000, (e) => {
  if (e) {
    console.log(e);
  }
  console.log("corriendo en el puerto 3000");
});
