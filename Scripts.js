const icon = document.getElementById("icon");
const sideBar = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const main = document.querySelector("main");
const btnNuevoProyecto = document.getElementById("btnNuevoProyecto");
const formularioProyecto = document.getElementById("formularioProyecto");
const listaProyectos = document.getElementById("listaProyectos");
const proyectoForm = document.getElementById("proyectoForm");

// Cargar proyectos guardados al iniciar la página
document.addEventListener("DOMContentLoaded", cargarProyectos);

// Modo oscuro
palanca.addEventListener("click", () => {
  let body = document.body;
  body.classList.toggle("dark-mode");
  circulo.classList.toggle("prendido");
});

// Minimizar barra lateral
icon.addEventListener("click", () => {
  sideBar.classList.toggle("mini-barra-lateral");
  main.classList.toggle("min-main");
  spans.forEach((span) => {
    span.classList.toggle("oculto");
  });
});

// Mostrar/ocultar formulario
btnNuevoProyecto.addEventListener("click", () => {
  formularioProyecto.style.display = "block";
  listaProyectos.style.display = "none";
});

// Manejar el formulario
proyectoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreProyecto").value;
  const imagen = document.getElementById("imagenProyecto").files[0];
  const fecha = document.getElementById("fechaProyecto").value;
  const urlMediaFire = document.getElementById("urlMediaFire").value;

  if (!imagen || !urlMediaFire) {
    alert("Por favor, selecciona una imagen y proporciona la URL de MediaFire.");
    return;
  }

  try {
    const imagenURL = URL.createObjectURL(imagen);

    const proyecto = {
      nombre: nombre,
      imagenURL: imagenURL,
      fecha: fecha,
      urlMediaFire: urlMediaFire,
    };

    guardarProyecto(proyecto);
    mostrarProyecto(proyecto);

    formularioProyecto.style.display = "none";
    listaProyectos.style.display = "block";
    proyectoForm.reset();
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    alert("Hubo un error al crear el proyecto. Por favor, intenta nuevamente.");
  }
});

// Guardar proyecto en localStorage
function guardarProyecto(proyecto) {
  let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  proyectos.push(proyecto);
  localStorage.setItem("proyectos", JSON.stringify(proyectos));
}

// Cargar proyectos desde localStorage
function cargarProyectos() {
  let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  proyectos.forEach((proyecto) => mostrarProyecto(proyecto));
}

// Mostrar proyecto en la lista
function mostrarProyecto(proyecto) {
  const proyectoDiv = document.createElement("div");
  proyectoDiv.classList.add("proyecto");
  proyectoDiv.innerHTML = `
    <h3>${proyecto.nombre}</h3>
    <img src="${proyecto.imagenURL}" alt="${proyecto.nombre}" style="max-width: 100%; height: auto;">
    <p>Fecha de publicación: ${proyecto.fecha}</p>
    <a href="${proyecto.urlMediaFire}" target="_blank">Descargar Archivo</a>
    <button class="btnEliminar">Eliminar</button>
  `;

  // Agregar evento de eliminación
  const btnEliminar = proyectoDiv.querySelector(".btnEliminar");
  btnEliminar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      eliminarProyecto(proyecto, proyectoDiv);
    }
  });

  listaProyectos.appendChild(proyectoDiv);
}

// Eliminar proyecto
function eliminarProyecto(proyecto, proyectoDiv) {
  let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  proyectos = proyectos.filter((p) => p.nombre !== proyecto.nombre);
  localStorage.setItem("proyectos", JSON.stringify(proyectos));
  proyectoDiv.remove();
}