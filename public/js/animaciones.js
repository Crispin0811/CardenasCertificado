const combo = document.getElementById("combo");

const dni = document.getElementById("dni");
const codEstudiante = document.getElementById("codEstudiante");
const nombreApellidos = document.getElementById("nombreApellidos");

if (combo) {
  combo.addEventListener("change", (e) => {
    e.preventDefault();
    const opcion = e.target.value;
    switch (opcion) {
      case "1":
        dni.style.display = "flex";
        codEstudiante.style.display = "none";
        nombreApellidos.style.display = "none";
        break;
      case "2":
        dni.style.display = "none";
        codEstudiante.style.display = "flex";
        nombreApellidos.style.display = "none";
        break;
      case "3":
        dni.style.display = "none";
        codEstudiante.style.display = "none";
        nombreApellidos.style.display = "flex";
        break;
      default:
        dni.style.display = "none";
        codEstudiante.style.display = "none";
        nombreApellidos.style.display = "none";
        break;
    }
  });
}
