const Trabajador = require("../models/trabajadorModel");
const bcrypt = require("bcrypt");

const getTrabajadores = async (req, res) => {
  const trabajadores = await Trabajador.find();
  res.render("listaTrabajadores", {
    tituloPagina: "Lista de Trabajadores",
    trabajadores,
  });
};

const verFormularioTrabajador = (req, res) => {
  res.render("agregarTrabajador", {
    tituloPagina: "Agregar Trabajadores",
  });
};
const agregarTrabajador = async (req, res) => {
  

  let body = req.body;

  let rol;
  if (body.esDirector) {
    rol = "Director";
  } else {
    rol = "Secretaria";
  }

  let trabajador = new Trabajador({
    nombre: body.nombres,
    apellidoPaterno: body.apePaterno,
    apellidoMaterno: body.apeMaterno,
    dni: body.dni,
    rol,
    contrasena: bcrypt.hashSync(body.dni, 10),
  });

  await trabajador.save(async(err, trabajadorBD) => {
    if (err) {
      let error;

      if (err.errors) {
        const errores = err.errors.dni.properties.type;
        if (errores == "minlength" || errores == "maxlength") {
          error = "El campo DNI debe tener 8 digitos";
        }
      }
      if (err.code && err.code == 11000) {
        error = `El DNI ${body.dni} ya está registrado`;
      }

      return res.render("agregarTrabajador", {
        tituloPagina: "Agregar Trabajadores",
        error,
        err,
      });
      // return res.json({
      //   err,
      //   mensaje: "primero",
      //   error,
      // });
    }
    if (!trabajadorBD) {
      return res.render("agregarTrabajador", {
        tituloPagina: "Agregar Trabajadores",
        error: "Ocurrio algun error con la Base de Datos",
        err,
      });

      // return res.json({
      //   err,
      //   mensaje: "sengundo",
      // });
    }

    const trabajadores = await Trabajador.find();

    res.render("listaTrabajadores", {
      tituloPagina: "Lista de Trabajadores",
      exito: "Se agregó un nuevo trabajador correctamente",
      trabajadores,
    });
  });
};

module.exports = {
  getTrabajadores,
  verFormularioTrabajador,
  agregarTrabajador,
};
