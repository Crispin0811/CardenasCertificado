import Swal from "sweetalert2";
import axios from "axios";
const btnEliminar = document.querySelectorAll("input.btn-danger");

if (btnEliminar) {
  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idTrabajador = e.target.dataset.trabajador;
      console.log(idTrabajador)
      const filaTabala = e.target.parentElement.parentElement;
      const url = location.origin + `/trabajador/${idTrabajador}`;

      Swal.fire({
        title: "¿Estas seguro que quieres eliminar a este Trabajador?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Eliminar!",
        cancelButtonText: "No, Cancelar",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(url, { params: idTrabajador })
            .then((resp) => {
              if (resp.status == 200) {
                filaTabala.parentElement.removeChild(filaTabala);
                Swal.fire({
                  title: "Eliminado",
                  text: resp.data,
                  icon: "success",
                  // timer: 1500,
                });
              }
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                title: "Ocurrio un error",
                icon: "error",
                timer: 1500,
              });
            });
        }
      });
    });
  });
}

export default btnEliminar;
