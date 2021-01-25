// instanciando
// const combo = document.getElementById("combo");
const anioLectivoInicio = document.getElementById("anioLectivoInicio");
const selectAnioLectivo = document.querySelectorAll(".comboAnioLectivo");
const cantidadCursos = document.getElementById("cantidadCursos");
const divNotas = document.getElementById("notas");
const cbTraslado = document.getElementById("traslado");
const divColegiosTraslados = document.getElementById("colegiosTraslados");
const divComportamiento = document.querySelectorAll("#divParaLlenar")[2];

// arr de los cursos
const cursos = [
  { nombre: "mate", value: "matiiii" },
  { nombre: "comu", value: "comu" },
  { nombre: "ps", value: "ps" },
  { nombre: "comu", value: "comu" },
  { nombre: "comu", value: "comu" },
  { nombre: "comu", value: "comu" },
];

//EVENTOS

// LLENAR LOS CAMPOS PARA LAS NOTAS
cantidadCursos.addEventListener("blur", (e) => {
  const cantidad = parseInt(e.target.value);

  if (cantidad > 0) {
    if (divNotas.hasChildNodes()) {
      while (divNotas.childNodes.length >= 1) {
        divNotas.removeChild(divNotas.firstChild);
      }
    }

    for (j = 1; j <= cantidad; j++) {
      //AÑADIR Switch
      const divEsTaller = document.createElement("div");
      divEsTaller.classList.add("switch");
      divEsTaller.style.margin = "auto";
      divEsTaller.style.padding = "auto";

      const labelTaller = document.createElement("label");

      const inputTaller = document.createElement("input");
      inputTaller.type = "checkbox";
      inputTaller.classList.add("checkboxTaller");

      const spanTaller = document.createElement("span");
      spanTaller.classList.add("lever");

      labelTaller.appendChild(inputTaller);
      labelTaller.appendChild(spanTaller);

      divEsTaller.appendChild(labelTaller);

      //AÑADIENDO LOS HIDDEN

      const inputHidden = document.createElement("input");
      inputHidden.type = "text";
      inputHidden.classList.add("inputHidden");
      inputHidden.value = "no";
      inputHidden.name = `esTaller${j}`;
      inputHidden.hidden = true;

      // llenar los combo de los cursos
      const select = document.createElement("select");
      select.id = "combo";
      select.classList.add("form-select");
      select.style.width = "90%";
      select.required = true;
      select.name = `curso${j}`;

      // AGREGAR OPCION SELECTED
      const optionSelected = document.createElement("option");
      optionSelected.innerText = `Agregar Curso ${j}:`;
      optionSelected.value = "";
      select.appendChild(optionSelected);

      cursos.forEach((curso) => {
        const option = document.createElement("option");
        option.value = curso.value;
        option.innerText = curso.nombre;
        select.appendChild(option);
      });

      // divNotas.appendChild(select);

      const input = document.createElement("input");
      input.type = "number";
      input.classList.add("notas");
      input.placeholder = `Nota ${j}`;
      input.required = "true";
      input.min = "11";
      input.max = "20";
      input.value = "20"; //dfsdfjksdhkfjhsdkjhfkjsdhkfjhsdkfhskdj
      input.name = `nota${j}`;

      divNotas.appendChild(inputHidden);

      divNotas.appendChild(divEsTaller);

      divNotas.appendChild(select);

      divNotas.appendChild(input);
    }

    divComportamiento.style.display = "grid";

    //CAMBIAR VALUE DEL INPUT HIDDEN
    const checkboxTaller = document.querySelectorAll(".checkboxTaller");
    const inputHidden = document.querySelectorAll(".inputHidden");
    checkboxTaller.forEach((cbt, index) => {
      cbt.addEventListener("change", (e) => {
        if (e.target.checked) {
          inputHidden[index].value = "si";
        } else {
          inputHidden[index].value = "no";
        }
      });
    });
  }
});

//PARA LOS COMBOS DE LOS TRASLADOS
cbTraslado.addEventListener("change", (e) => {
  if (e.target.checked) {
    divColegiosTraslados.style.display = "block";
  } else {
    divColegiosTraslados.style.display = "none";
  }
});
