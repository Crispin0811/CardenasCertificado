const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.use(flash());
app.use(cookieParser());
app.use(
  session({
    secret: "keySecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // res.locals.errores = req.flash();
  res.locals.user = req.flash("user");
  next();
});

//las rutas
app.use(require("./routes/todasRutas"));

//coneccion a la base de datos
require("./config/bd");

app.listen(3000, (e) => {
  if (e) {
    console.log(e);
  }
  console.log("corriendo en el puerto 3000");
});
