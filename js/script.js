// Función para cambiar el idioma
async function changeLanguage(newLanguage) {
  let response = await fetch("language.json");
  let config = await response.json();

  // Actualizar el idioma en el HTML
  document.getElementById("pageTitle").textContent = config.gameTitle[newLanguage];
  document.getElementById("gameTitle").textContent = config.gameTitle[newLanguage];
  document.getElementById("settingsModalLabel").textContent = config.modal.title1[newLanguage];
  document.getElementById("infoModalLabel").textContent = config.modal.title2[newLanguage];

  document.getElementById("keyA").innerHTML = config.modal.keys.A[newLanguage];
  document.getElementById("keyW").innerHTML = config.modal.keys.W[newLanguage];
  document.getElementById("keyS").innerHTML = config.modal.keys.S[newLanguage];
  document.getElementById("keyD").innerHTML = config.modal.keys.D[newLanguage];
  document.getElementById("keyQ").innerHTML = config.modal.keys.Q[newLanguage];
  document.getElementById("keyE").innerHTML = config.modal.keys.E[newLanguage];
  document.getElementById("keyF").innerHTML = config.modal.keys.F[newLanguage];
  document.getElementById("keySPACE").innerHTML = config.modal.keys.SPACE[newLanguage];
  document.getElementById("keyENTER").innerHTML = config.modal.keys.ENTER[newLanguage];

  document.getElementById("objectiveTitle").textContent = config.modal.objective.title[newLanguage];
  document.getElementById("objectiveDescription").textContent = config.modal.objective.description[newLanguage];
  document.getElementById("characterDescription").textContent = config.modal.objective.character[newLanguage];
  document.getElementById("krakenDescription").textContent = config.modal.objective.kraken[newLanguage];
  document.getElementById("castawayDescription").textContent = config.modal.objective.castaway[newLanguage];
  document.getElementById("jellyfishDescription").textContent = config.modal.objective.jellyfish[newLanguage];
  document.getElementById("bombDescription").textContent = config.modal.objective.bomb[newLanguage];
  document.getElementById("chestDescription").textContent = config.modal.objective.chest[newLanguage];

  // Actualizar el idioma en el canvas de p5.js
  currentLanguage = newLanguage;
  redraw(); // Forzar la redibujación del canvas

  // Guardar el idioma seleccionado en el localStorage
  localStorage.setItem("userLanguage", newLanguage);
}

// Función para manejar la pantalla de carga
function handleWelcomeScreen() {
  setTimeout(function () {
    document.getElementById("welcome-screen").style.opacity = 0;
    setTimeout(function () {
      document.getElementById("welcome-screen").style.display = "none";
    }, 1000);
  }, 2000);
}

// Eventos para los botones de cambio de idioma
document.getElementById("lang-es").addEventListener("click", () => changeLanguage("es"));
document.getElementById("lang-en").addEventListener("click", () => changeLanguage("en"));
document.getElementById("lang-pt").addEventListener("click", () => changeLanguage("pt"));
document.getElementById("lang-zh").addEventListener("click", () => changeLanguage("zh"));

// Cargar el idioma por defecto y manejar la pantalla de carga
window.onload = function () {
  // Cargar el idioma guardado en el localStorage (si existe)
  const savedLanguage = localStorage.getItem("userLanguage");

  // Si hay un idioma guardado, usarlo; de lo contrario, usar el idioma por defecto (español)
  const defaultLanguage = savedLanguage || "es";

  // Cambiar al idioma guardado o por defecto
  changeLanguage(defaultLanguage);

  // Manejar la pantalla de carga
  handleWelcomeScreen();
};