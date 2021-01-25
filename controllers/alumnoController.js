const Alumno = require("../models/alumnoModel");
const Curso = require("../models/cursoModel");
const Grado = require("../models/gradoModel");

const formAlumno = (req, res) => {
  res.render("agregarAlumno", {
    tituloPagina: "Agregar Alumno",
  });
};
const agregarAlumno = (req, res) => {
  let alumno = new Alumno({
    nombre: req.body.nombre,
    apellidoPaterno: req.body.apellidoPater,
    apellidoMaterno: req.body.apellidoMater,
    dni: req.body.dni,
    codEstudiante: req.body.CodEstudiante,
  });

  alumno.save((err, alumnoBD) => {
    if (err) {
      // console.log(err.keyValue);
      // return res.status(404).json({ mensaje: "false", err });

      let error;
      if (err.keyValue.dni) {
        error = "Ya se registró a un alumno con ese DNI";
      } else if (err.keyValue.codEstudiante) {
        error = "Ya se registró a un alumno con ese código";
      }

      // if (err.keyValue) {
      //   return res.render("agregarAlumno", {
      //     tituloPagina: "Agregar Alumno",
      //     error,
      //     nombre: req.body.nombre,
      //     apellidoPaterno: req.body.apellidoPater,
      //     apellidoMaterno: req.body.apellidoMater,
      //     dni: req.body.dni,
      //     codEstudiante: req.body.CodEstudiante,
      //   });
      // }

      return res.json({
        err,
      });
    }

    if (!alumnoBD) {
      return res.status(404).json({
        err,
        mensaje: "segundo alumno",
      });
    }

    return res.render("agregarNotas", {
      tituloPagina: `Agregar notas de ${alumnoBD.nombre} ${alumnoBD.apellidoPaterno}`,
      alumno: alumnoBD,
    });
  });
};

const agregarNotas = async (req, res) => {
  const datos = Object.values(req.body);

  const { cantCurso } = req.body;
  const { gradoHidden } = req.body;

  let encabezado;
  let gradoT;

  const estallerArr = getDatosArr(datos, cantCurso, 4);
  const CursosArr = getDatosArr(datos, cantCurso, 5);
  const NotasArr = getDatosArr(datos, cantCurso, 6);

  let curso = new Curso({
    nombre: CursosArr,
    nota: NotasArr,
    isTaller: estallerArr,
  });

  curso.save((err, cursoBD) => {
    if (err) {
      return res.json({
        err,
        mensaje: "primero curso",
      });
    }
    if (!cursoBD) {
      return res.json({
        err,
        mensaje: "segundo curso",
      });
    }
  });

  let grado = new Grado({
    comportamiento: req.body.comportamiento,
    anioLectivo: req.body.anioLectivo,
    grado: req.body.gradoHidden,
    colOrigen: req.body.nombreColegio,
    cursos: curso._id,
  });

  grado.save((err, gradoBD) => {
    if (err) {
      return res.json({
        err,
        mensaje: "primero grado",
      });
    }
    if (!gradoBD) {
      return res.json({
        err,
        mensaje: "segundo grado",
      });
    }
  });

  if (gradoHidden == "1") {
    (encabezado = "Segundo Grado"), (gradoT = "2");
  } else if (gradoHidden == "2") {
    (encabezado = "Tercero Grado"), (gradoT = "3");
  } else if (gradoHidden == "3") {
    (encabezado = "Cuarto Grado"), (gradoT = "4");
  } else if (gradoHidden == "4") {
    (encabezado = "Quinto Grado"), (gradoT = "5");
  }

  const alumno = await Alumno.findById(req.body.idAlumno);
  if (!alumno) {
    return res.status(404).json({
      mensaje: "Alumno no encontrado",
    });
  }

  let arrGrados = alumno.grados;
  arrGrados.push(grado._id);

  alumno.grados = arrGrados;

  alumno.save((err, alumnoBD) => {
    if (err) {
      return res.json({
        err,
        mensaje: "primero alumno",
      });
    }
    if (!alumnoBD) {
      return res.json({
        err,
        mensaje: "segundo alumno",
      });
    }

    if (gradoHidden == "5") {
      return res.render("agregarAlumno", {
        tituloPagina: "Agregar Alumno",
        exito: "El Alumno se registró correctamente",
      });
    }

    return res.render("agregarNotas", {
      tituloPagina: `Agregar notas de ${alumno.nombre} ${alumno.apellidoPaterno}`,
      alumno,
      encabezado,
      gradoT,
    });
  });
};

const verAlumno = async (req, res) => {
  await Alumno.find()
    .populate({ path: "grados", populate: { path: "cursos" } })
    .exec((err, alumnoDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        alumno: alumnoDB,
      });
    });
};

//OTRAS FUNCIONES

const getDatosArr = (datos, cantCursos, index) => {
  let datosArr = [];

  let indexCursos = 1;
  let indexDatosCursos = index;
  while (indexCursos <= cantCursos) {
    datosArr.push(datos[indexDatosCursos]);
    indexCursos++;
    indexDatosCursos += 3;
  }

  return datosArr;
};

module.exports = {
  formAlumno,
  agregarAlumno,
  verAlumno,
  agregarNotas,
};
