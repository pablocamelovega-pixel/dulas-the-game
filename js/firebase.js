// URL de tu Función de Azure
const AZURE_FUNCTION_URL = "https://dulas-the-game-api-comercial-agf4hca0hwabgzg6.centralus-01.azurewebsites.net/api/guardarPuntaje";

window.guardarPuntaje = async function(nombre, sucursal, tipoParticipacion, equipo, puntaje, trivia) {
    console.log("Enviando datos a Azure...");
    try {
        const respuesta = await fetch(AZURE_FUNCTION_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, sucursal, tipoParticipacion, equipo, puntaje, trivia })
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

const AZURE_RANKING_URL = "https://dulas-the-game-api-comercial-agf4hca0hwabgzg6.centralus-01.azurewebsites.net/api/obtenerRanking";

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

window.addEventListener("load", cargarRanking);

const AZURE_VERIFICAR_EQUIPO_URL = "https://dulas-the-game-api-comercial-agf4hca0hwabgzg6.centralus-01.azurewebsites.net/api/verificarEquipo";

const AZURE_PREMIO_URL = "https://dulas-the-game-api-comercial-agf4hca0hwabgzg6.centralus-01.azurewebsites.net/api/guardarPremio";

window.guardarPremio = async function(nombre, sucursal, area, cargo, puntaje) {
    console.log("Enviando premio a Azure...");
    try {
        const respuesta = await fetch(AZURE_PREMIO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, sucursal, area, cargo, puntaje })
        });

        if (!respuesta.ok) {
            throw new Error("Error del servidor: " + respuesta.status);
        }

        const resultado = await respuesta.json();
        console.log("¡Éxito! Premio guardado:", resultado);

    } catch (error) {
        console.error("Error al guardar el premio en Azure:", error);
        throw error;
    }
};

const AZURE_TRIVIA_URL = "https://dulas-the-game-api-comercial-agf4hca0hwabgzg6.centralus-01.azurewebsites.net/api/guardarTrivia";

window.guardarEstadisticasTrivia = async function(trivia) {
    if (!trivia || trivia.length === 0) { return; }
    try {
        await fetch(AZURE_TRIVIA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trivia })
        });
        console.log("Estadísticas de trivia guardadas.");
    } catch (error) {
        console.error("No se pudieron guardar las estadísticas de trivia:", error);
    }
};
