// URL de tu Función de Azure
const AZURE_FUNCTION_URL = "https://dulas-the-game-api-abbmayetgkebfghn.centralus-01.azurewebsites.net/api/guardarPuntaje";

// Función global para guardar el puntaje desde el index.html
window.guardarPuntaje = async function(nombre, sucursal, tipoParticipacion, equipo, puntaje) {
    console.log("Enviando datos a Azure...");
    try {
        const respuesta = await fetch(AZURE_FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, sucursal, tipoParticipacion, equipo, puntaje })
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

function crearTarjetaEquipo(equipo) {
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

    return tarjeta;
}

function cargarRanking() {
    fetch(AZURE_RANKING_URL)
        .then(function (respuesta) { return respuesta.json(); })
        .then(function (datos) {
            document.getElementById("highScoreValor").innerText =
                datos.highScore.nombre + " — " + datos.highScore.puntaje + " pts";

            const contenedorSucursales = document.getElementById("listaSucursales");
            const contenedorBogota = document.getElementById("listaBogota");
            contenedorSucursales.innerHTML = "";
            contenedorBogota.innerHTML = "";

            datos.rankingEquipos.forEach(function (equipo) {
                contenedorSucursales.appendChild(crearTarjetaEquipo(equipo));
            });

            datos.rankingBogota.forEach(function (equipo) {
                contenedorBogota.appendChild(crearTarjetaEquipo(equipo));
            });

            if (!contenedorBogota.hasChildNodes()) {
                contenedorBogota.innerText = "Sin registros todavía.";
            }
            if (!contenedorSucursales.hasChildNodes()) {
                contenedorSucursales.innerText = "Sin registros todavía.";
            }
        })
        .catch(function (error) {
            console.error("Error al cargar el ranking:", error);
            document.getElementById("listaSucursales").innerText = "No se pudo cargar el ranking.";
            document.getElementById("listaBogota").innerText = "No se pudo cargar el ranking.";
        });
}

// Cargar el ranking apenas se abre la página
window.addEventListener("load", cargarRanking);

// URL de la Función que verifica el cupo del equipo
const AZURE_VERIFICAR_EQUIPO_URL = "https://dulas-the-game-api-abbmayetgkebfghn.centralus-01.azurewebsites.net/api/verificarEquipo";