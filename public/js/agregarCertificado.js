// instanciando
const anioLectivoInicio = document.getElementById("anioLectivoInicio");
const selectAnioLectivo = document.querySelectorAll(".comboAnioLectivo");
const cantidadCursos = document.getElementById("cantidadCursos");
const divNotas = document.getElementById("notas");
const cbTraslado = document.getElementById("traslado");
const divColegiosTraslados = document.getElementById("colegiosTraslados");
const divComportamiento = document.querySelectorAll("#divParaLlenar")[2];

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

      //PARA AUTOCOMPLETADO

      const divAuto = document.createElement("div");
      divAuto.classList.add("row", "sinMarginBottom");

      const divAuto2 = document.createElement("div");
      divAuto2.classList.add("col");

      const divAuto3 = document.createElement("div");
      divAuto3.classList.add("row");

      const divAuto4 = document.createElement("div");
      divAuto4.classList.add("input-field", "col");

      const inputAuto = document.createElement("input");
      inputAuto.type = "text";
      inputAuto.id = `curso${j}`;
      inputAuto.classList.add("autocomplete", "input");
      inputAuto.name = `curso${j}`;

      const labelAuto = document.createElement("label");
      labelAuto.setAttribute("for", `curso${j}`);
      labelAuto.innerText = `Agregar Curso ${j}:`;

      divAuto4.appendChild(inputAuto);
      divAuto4.appendChild(labelAuto);

      divAuto3.appendChild(divAuto4);

      divAuto2.appendChild(divAuto3);

      divAuto.appendChild(divAuto2);

      //PARA AUTOCOMPLETADO

      const input = document.createElement("input");
      input.type = "number";
      input.classList.add("notas");
      input.placeholder = `Nota ${j}`;
      input.required = "true";
      input.min = "11";
      input.max = "20";
      input.name = `nota${j}`;

      divNotas.appendChild(inputHidden);

      divNotas.appendChild(divEsTaller);

      divNotas.appendChild(divAuto);

      // divNotas.appendChild(select);

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
  autocompletarCampos();
});

//PARA LOS COMBOS DE LOS TRASLADOS
cbTraslado.addEventListener("change", (e) => {
  if (e.target.checked) {
    divColegiosTraslados.style.display = "block";
  } else {
    divColegiosTraslados.style.display = "none";
  }
});

//PARA LLENAR LOS CAMPOS CON LOS CURSOS

let options = {
  //COMO MAX 23 L.
  data: {
    Matemática: null,
    Comunicación: null,
    Ingles: null,
    Arte: null,
    "Historia, Geografía y Economía": null,
    "Formación Ciudadana y Cívica": null,
    "Persona, Familia y Relaciones Humanas": null,
    "Educación Física": null,
    "Educación Religiosa": null,
    "Ciencia Tecnología y Ambiente": null,
    "Educación para el Trabajo": null,
    "Desarrollo personal, ciudadanía y cívica": null,
    "Ciencias sociales": null,
    "Arte y cultura": null,
    "Ciencia tecnología": null,
    "Castellano como segunda lengua": null,
    "Especialidad Ocupacional": null,
    "Razonamiento Matemático": null,
    "Habilidades Comunicativas": null,
    Literatura: null,
    "Geografía Perú y Mundo": null,
    "Educación Cívica": null,
    "Economía Política": null,
    "Filosofía y Lógica": null,
    "Educación Artística": null,
    Física: null,
    "Formación Laboral": null,
    "Historia del Perú": null,
    "Historia Universal": null,
    "Lenguaje y Literatura": null,
    "Ciencias Naturales": null,
    Psicología: null,
    Biología: null,
    Lenguaje: null, //este
    "Geografía del Perú y del Mundo": null, //este
    Quimica: null,
    "Educación Cívica, Patri": null, //este FALTA
    "Educ. ARTE": null, //este FALTA
    "Educación Cívica y Militar": null, //este FALTA
  },
};

function autocompletarCampos() {
  let elems = document.querySelectorAll(".autocomplete");
  elems.forEach((ele) => {
    let instances = M.Autocomplete.init(ele, options);
  });
}

//PARA LLENAR LOS CAMPOS CON LOS CURSOS
