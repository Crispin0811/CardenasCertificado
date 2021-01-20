const Alumno = require("../models/alumnoModel");
const Curso = require("../models/cursoModel");
const Grado = require("../models/gradoModel");

const formAlumno = (req, res) => {
  res.render("agregarAlumno", {
    tituloPagina: "Agregar Alumno",
  });
};
const agregarAlumno = (req, res) => {
  const datos = Object.values(req.body);

  const { cantCursos } = req.body;

  //ANIOS DE QUINTO
  let anioPriToQui = [
    req.body.anioLectivoInicio,
    req.body.segGr,
    req.body.terGr,
    req.body.cuaGr,
    req.body.quiGr,
  ];

  //NOTAS DE COMPORTAMIENTO
  let comportamientos = [
    req.body.compPrigr,
    req.body.compSeggr,
    req.body.compTergr,
    req.body.compCuagr,
    req.body.compQuigr,
  ];

  //NOMBRES DEL COLEGIOS TRASLADODOS
  let nomColTrasladados = [
    req.body.nombreColegio1,
    req.body.nombreColegio2,
    req.body.nombreColegio3,
    req.body.nombreColegio4,
    req.body.nombreColegio5,
  ];

  const datosCursos = datosLimpiosCursos(datos, cantCursos);

  let idCursos = [];
  let idGrados = [];
  for (let j = 0; j < cantCursos; j++) {
    let notas = [];
    for (let i = 1; i <= 5; i++) {
      notas.push(datosCursos[j][i]);
    }

    let cursos = new Curso({
      nombre: datosCursos[j][0],
      nota: notas,
    });

    cursos.save((err, cursosBD) => {
      if (err) {
        return res.json({
          err,
          mensaje: "primero curso",
        });
      }

      if (!cursosBD) {
        return res.json({
          err,
          mensaje: "segundo curso",
        });
      }
    });

    idCursos.push(cursos._id);
  }

  for (let k = 0; k < 5; k++) {
    let grado = new Grado({
      comportamiento: comportamientos[k],
      anioLectivo: anioPriToQui[k],
      grado: k + 1,
      colOrigen: nomColTrasladados[k],
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
    idGrados.push(grado._id);
  }

  let alumno = new Alumno({
    nombre: req.body.nombre,
    apellidoPaterno: req.body.apellidoPater,
    apellidoMaterno: req.body.apellidoMater,
    dni: req.body.dni,
    codEstudiante: req.body.CodEstudiante,
    grados: idGrados,
    cursos: idCursos,
  });

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
  });

  res.json({
    ok: "Agregado",
    alumno,
  });

  // let alumno = new Alumno({
  //   nombre: nombre,
  //   apellidoPaterno: apellidoPater,
  //   apellidoMaterno: apellidoMater,
  //   dni: dni,
  //   codEstudiante: CodEstudiante,
  //   grados: grados,
  // });

  // alumno.save((err, alumnoBD) => {
  //   if (err) {
  //     return res.json({
  //       err,
  //       mensaje: "primero",
  //     });
  //   }

  //   if (!alumnoBD) {
  //     return res.json({
  //       err,
  //       mensaje: "segundo",
  //     });
  //   }

  //   res.json({
  //     ok: "agregado",
  //   });
  // });

  // console.log(req.body);
  // console.log(datos);
  // console.log(datosCursos);
  // res.send("agregaste alumno");
};

const verAlumno = async (req, res) => {
  await Alumno.find()
    .populate("grados")
    .populate("cursos")
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
const getDatosCursos = (datos, n) => {
  let notas = [];
  let i = 1;
  let notasIndex = n;
  while (notasIndex <= datos.length) {
    if (i <= 6) {
      notas.push(datos[notasIndex]);
    } else {
      break;
    }
    notasIndex++;
    i++;
  }

  return notas;
};

const datosLimpiosCursos = (datos, cantCursos) => {
  let cursos = [];

  let indexCursos = 1;
  let indexDatosCursos = 16;
  while (indexCursos <= cantCursos) {
    const datosCurso = getDatosCursos(datos, indexDatosCursos);
    cursos.push(datosCurso);
    indexCursos++;
    indexDatosCursos += 6;
  }

  return cursos;
};

module.exports = {
  formAlumno,
  agregarAlumno,
  verAlumno,
  
};
