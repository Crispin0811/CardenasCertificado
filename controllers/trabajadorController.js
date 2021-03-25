const Trabajador = require("../models/trabajadorModel");
const bcrypt = require("bcrypt");

const getTrabajadores = async (req, res) => {
  const trabajadores = await Trabajador.find().sort({
    rol: 1,
    apellidoPaterno: 1,
  });
  res.render("listaTrabajadores", {
    tituloPagina: "Lista de Trabajadores",
    trabajadores,
  });
};

const verFormularioTrabajador = (req, res) => {
  res.render("agregarTrabajador", {
    tituloPagina: "Agregar Trabajador",
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

  await trabajador.save(async (err, trabajadorBD) => {
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

    const trabajadores = await Trabajador.find().sort({
      rol: 1,
      apellidoPaterno: 1,
    });

    res.render("listaTrabajadores", {
      tituloPagina: "Lista de Trabajadores",
      exito: "El trabajador fue agregado correctamente",
      trabajadores,
    });
  });
};

const eliminarTrabajador = async (req, res) => {
  const { id } = req.params;
  const trabajador = await Trabajador.findByIdAndDelete(id);

  if (!trabajador) {
    return res.status(400).send("Ocurrio un error al borrar al trabajador");
  }
  res
    .status(200)
    .send(
      `El trabjador ${trabajador.nombre} ${trabajador.apellidoPaterno}, fue eliminado correctamente`
    );
};
const editarTrabajador = async (req, res, next) => {
  const { id } = req.params;
  await Trabajador.findById(id, (err, trabajadorBD) => {
    if (err) {
      return res.send(err);
    }
    if (!trabajadorBD) {
      return res.send("No se encontró trabajador");
    }
    res.render("agregarTrabajador", {
      tituloPagina: "Editar Trabajador",
      trabajadorBD,
    });
  });
};

const actualizarTrabajador = async (req, res) => {
  const { id } = req.params;
  let body = req.body;

  let rol;
  if (body.esDirector) {
    rol = "Director";
  } else {
    rol = "Secretaria";
  }

  let trabajador = {
    nombre: body.nombres,
    apellidoPaterno: body.apePaterno,
    apellidoMaterno: body.apeMaterno,
    dni: body.dni,
    rol,
  };

  if (
    trabajador.nombre == "" ||
    trabajador.apellidoPaterno == "" ||
    trabajador.apellidoMaterno == "" ||
    trabajador.dni == "" ||
    trabajador.dni.length != 8
  ) {
    return res.redirect(`/trabajador/editar/${id}`);
  }

  Trabajador.findByIdAndUpdate(id, trabajador, async (err, trabajadorBD) => {
    if (err) {
      if (err.code && err.code == 11000) {
        return res.redirect(`/trabajador/editar/${id}`);
      }
      return res.status(400).json({ ok: false, err });
    }
    if (!trabajadorBD) {
      return res
        .status(400)
        .json({ ok: false, err, mensaje: "Algo salio mal" });
    }
    const trabajadores = await Trabajador.find().sort({
      rol: 1,
      apellidoPaterno: 1,
    });
    res.render("listaTrabajadores", {
      tituloPagina: "Lista de Trabajadores",
      trabajadores,
      exito: "Los datos del tabajor fueron editados correctamente",
    });
  });
};

const formCambiarContrasena = (req, res) => {
  const idTrabajador = req.cookies.idTrabajador;
  res.render("cambiarContrasena", {
    tituloPagina: "Cambiar Contraseña",
    idTrabajador,
  });
};

const cambiarContrasena = async (req, res) => {
  const idTrabajador = req.cookies.idTrabajador;
  const tratabajador = await Trabajador.findById(
    req.body.idTrabajador,
    (err, tratabajadorBD) => {
      if (err) {
        return res.render("cambiarContrasena", {
          tituloPagina: "Cambiar Contraseña",
          error: "Usuario no existe",
          idTrabajador,
        });
      }
      if (!tratabajadorBD) {
        return res.render("cambiarContrasena", {
          tituloPagina: "Cambiar Contraseña",
          error: "Usuario no existe",
          idTrabajador,
        });
      }

      if (
        req.body.nuevaContraseña != req.body.repetirContraseña ||
        req.body.contraseñaActual == "" ||
        req.body.nuevaContraseña == "" ||
        req.body.repetirContraseña == ""
      ) {
        return res.render("cambiarContrasena", {
          tituloPagina: "Cambiar Contraseña",
          errorContrasena: "Datos incorrectos",
          idTrabajador,
        });
      }

      const march = bcrypt.compareSync(
        req.body.contraseñaActual,
        tratabajadorBD.contrasena
      );
      if (!march) {
        return res.render("cambiarContrasena", {
          tituloPagina: "Cambiar Contraseña",
          errorContrasena: "Contraseña incorrecta",
          idTrabajador,
        });
      }

      let newContrasena = bcrypt.hashSync(req.body.nuevaContraseña, 10);

      tratabajadorBD.contrasena = newContrasena;

      tratabajadorBD.save((err, tratabajadorBD2) => {
        if (err) {
          return res.json({
            ok: " error en save",
          });
        }

        if (!tratabajadorBD2) {
          return res.json({
            ok: " error en save 2",
          });
        }
        res.render("cambiarContrasena", {
          tituloPagina: "Cambiar Contraseña",
          exito: "Contraseña Actualizada Correctamente",
        });
      });
    }
  );
};

module.exports = {
  getTrabajadores,
  verFormularioTrabajador,
  agregarTrabajador,
  eliminarTrabajador,
  editarTrabajador,
  actualizarTrabajador,
  formCambiarContrasena,
  cambiarContrasena,
};
