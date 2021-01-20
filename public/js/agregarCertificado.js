// instanciando
// const combo = document.getElementById("combo");
const anioLectivoInicio = document.getElementById("anioLectivoInicio");
const selectAnioLectivo = document.querySelectorAll(".comboAnioLectivo");
const cantidadCursos = document.getElementById("cantidadCursos");
const divNotas = document.getElementById("notas");
const cbTraslado = document.getElementById("traslado");
const divColegiosTraslados = document.getElementById("colegiosTraslados");

let anioLec1 = 0;

// arr de los cursos
const cursos = [
  { nombre: "mate", value: "matiiii" },
  { nombre: "comu", value: "comu" },
  { nombre: "ps", value: "ps" },
  { nombre: "comu", value: "comu" },
  { nombre: "comu", value: "comu" },
  { nombre: "comu", value: "comu" },
];

// EVENTOS

//LLENAR LOS COMBOS DE LOS AÑOS
anioLectivoInicio.addEventListener("blur", (e) => {
  anioLec1 = parseInt(e.target.value);

  if (anioLec1 > 1960 && anioLec1 < 2017) {
    selectAnioLectivo.forEach((ele) => {
      ele.disabled = false;
      if (ele.hasChildNodes()) {
        while (ele.childNodes.length >= 1) {
          ele.removeChild(ele.firstChild);
        }
      }

      for (i = 0; i <= 6; i++) {
        const option = document.createElement("option");
        option.innerText = anioLec1 + 1 + i;
        option.value = anioLec1 + 1 + i;
        ele.appendChild(option);
      }

      anioLec1++;
    });
  }

  cbTraslado.checked = false;
  divColegiosTraslados.style.display = "none";
});

// LLENAR LOS CAMPOS PARA LAS NOTAS
cantidadCursos.addEventListener("change", (e) => {
  const cantidad = parseInt(e.target.value);

  if (cantidad == 2 || cantidad == 3) {
    for (j = 1; j <= cantidad; j++) {
      // div principal
      const divComboNotas = document.createElement("div");
      divComboNotas.classList.add("divContenedor");

      // div contendor de combo de notas
      const divComboCursos = document.createElement("div");
      divComboCursos.id = "comboCursos";

      // llenar los combo de los cursos
      const select = document.createElement("select");
      select.id = "combo";
      select.classList.add("form-select", "combo");
      select.name = `curso${j}`;

      // AGREGAR OPCION SELECTED
      const optionSelected = document.createElement("option");
      optionSelected.innerText = "Agregar Curso";
      optionSelected.selected = "true";
      select.appendChild(optionSelected);

      cursos.forEach((curso) => {
        const option = document.createElement("option");
        option.value = curso.value;
        option.innerText = curso.nombre;
        select.appendChild(option);
      });

      divComboCursos.appendChild(select);

      // div contendor de inputs de notas
      const divNotasInput = document.createElement("div");
      divNotasInput.id = "notasInput";
      divNotasInput.style.display = "flex";
      for (i = 1; i <= 5; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("notas");
        input.required = "true";
        input.name = `nota${j}${i}`;
        input.value = "12";
        divNotasInput.appendChild(input);
      }

      divComboNotas.appendChild(divComboCursos);
      divComboNotas.appendChild(divNotasInput);

      // agregando al principal-general
      divNotas.appendChild(divComboNotas);
      // console.log(divNotas.childNodes.length);
    }
  }
});

//PARA LOS COMBOS DE LOS TRASLADOS
cbTraslado.addEventListener("change", (e) => {
  if (e.target.checked) {
    divColegiosTraslados.style.display = "block";

    let anios = [];
    const anioLectivoInicio = document.getElementById("anioLectivoInicio");
    const comboAnioLectivo = document.querySelectorAll(".comboAnioLectivo");
    anios.push(anioLectivoInicio.value);
    comboAnioLectivo.forEach((ele) => {
      anios.push(ele.value);
    });

    const aniosColegios = document.querySelectorAll(".aniosColegios");
    aniosColegios.forEach((ele) => {
      if (ele.hasChildNodes()) {
        while (ele.childNodes.length >= 1) {
          ele.removeChild(ele.firstChild);
        }
      }
      anios.forEach((anio) => {
        const option = document.createElement("option");
        option.innerText = anio;
        option.value = anio;
        ele.appendChild(option);
      });
    });
  } else {
    divColegiosTraslados.style.display = "none";
  }
});
