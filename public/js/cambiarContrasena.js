const nuevaContra = document.querySelectorAll(".input-field2 input")[1];
const repetirContra = document.querySelectorAll(".input-field2 input")[2];
const iNueva = document.querySelectorAll(".input-field2 i")[1];
const iRepetir = document.querySelectorAll(".input-field2 i")[2];
const error = document.querySelector("p");
const btnActualizar = document.getElementById("btnActualizar");

repetirContra.addEventListener("blur", (e) => {
  if (e.target.value == nuevaContra.value) {
    btnActualizar.disabled = false;
    iNueva.classList.remove("fasError");
    iRepetir.classList.remove("fasError");
    error.style.display = "none";
  } else {
    btnActualizar.disabled = true;
    iNueva.classList.add("fasError");
    iRepetir.classList.add("fasError");
    error.style.display = "block";
  }
});
