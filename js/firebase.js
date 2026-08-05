// URL de tu Función de Azure
const AZURE_FUNCTION_URL = "https://dulas-the-game-api-abbmayetgkebfghn.centralus-01.azurewebsites.net/api/guardarPuntaje";

// Función global para guardar el puntaje desde el index.html
window.guardarPuntaje = async function(nombre, correo, sucursal, tipoParticipacion, equipo, puntaje) {
    console.log("Enviando datos a Azure...");
    try {
        const respuesta = await fetch(AZURE_FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, correo, sucursal, tipoParticipacion, equipo, puntaje })
        });

        if (!respuesta.ok) {
            throw new Error("Error del servidor: " + respuesta.status);
        }

        const resultado = await respuesta.json();
        console.log("¡Éxito! Puntaje guardado:", resultado);

    } catch (error) {
        console.error("Error al guardar en Azure:", error);
        throw error;
    }
};

// URL de la Función que lee el ranking
const AZURE_RANKING_URL = "https://dulas-the-game-api-abbmayetgkebfghn.centralus-01.azurewebsites.net/api/obtenerRanking";

function cargarRanking() {
    fetch(AZURE_RANKING_URL)
        .then(function (respuesta) { return respuesta.json(); })
        .then(function (datos) {
            document.getElementById("highScoreValor").innerText =
                datos.highScore.nombre + " — " + datos.highScore.puntaje + " pts";

            const contenedor = document.getElementById("listaSucursales");
            contenedor.innerHTML = "";

            datos.rankingEquipos.forEach(function (equipo) {
                const tarjeta = document.createElement("div");
                tarjeta.style.border = "2px solid yellow";
                tarjeta.style.borderRadius = "8px";
                tarjeta.style.padding = "8px 12px";
                tarjeta.style.margin = "8px 0";
                tarjeta.style.display = "flex";
                tarjeta.style.justifyContent = "space-between";
                tarjeta.style.fontWeight = "bold";

                tarjeta.innerHTML =
                    "<span>" + equipo.equipo + " — " + equipo.sucursal + "</span>" +
                    "<span>" + equipo.total + " pts</span>";

                contenedor.appendChild(tarjeta);
            });
        })
        .catch(function (error) {
            console.error("Error al cargar el ranking:", error);
            document.getElementById("listaSucursales").innerText = "No se pudo cargar el ranking.";
        });
}

// Cargar el ranking apenas se abre la página
window.addEventListener("load", cargarRanking);
