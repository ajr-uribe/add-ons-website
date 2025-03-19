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
  const archivo = document.getElementById("archivoProyecto").files[0];

  if (!imagen || !archivo) {
    alert("Por favor, selecciona una imagen y un archivo para el proyecto.");
    return;
  }

  try {
    const imagenURL = URL.createObjectURL(imagen);
    const archivoURL = URL.createObjectURL(archivo);

    const proyecto = document.createElement("div");
    proyecto.classList.add("proyecto");
    proyecto.innerHTML = `
      <h3>${nombre}</h3>
      <img src="${imagenURL}" alt="${nombre}" style="max-width: 100%; height: auto;">
      <p>Fecha de publicación: ${fecha}</p>
      <a href="${archivoURL}" download="${nombre}.zip">Descargar Archivo</a>
    `;

    listaProyectos.appendChild(proyecto);
    formularioProyecto.style.display = "none";
    listaProyectos.style.display = "block";
    proyectoForm.reset();
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    alert("Hubo un error al crear el proyecto. Por favor, intenta nuevamente.");
  }
});