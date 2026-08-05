const AZURE_FUNCTION_URL = "https://dulas-the-game-api-abbmayetgkebfghn.centralus-01.azurewebsites.net/api/guardarPuntaje";

// Función global para guardar el puntaje desde el index.html
window.guardarPuntaje = async function(nombre, correo, sucursal, tipoParticipacion, puntaje) {
    console.log("Enviando datos a Azure...");
    try {
        const respuesta = await fetch(AZURE_FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, correo, sucursal, tipoParticipacion, puntaje })
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

            datos.rankingSucursales.forEach(function (item) {
                const fila = document.createElement("div");
                fila.style.border = "2px solid yellow";
                fila.style.borderRadius = "8px";
                fila.style.padding = "8px 12px";
                fila.style.margin = "8px 0";
                fila.style.display = "flex";
                fila.style.justifyContent = "space-between";
                fila.innerHTML = "<span>" + item.sucursal + "</span><span>" + item.puntaje + " pts</span>";
                contenedor.appendChild(fila);
            });
        })
        .catch(function (error) {
            console.error("Error al cargar el ranking:", error);
            document.getElementById("listaSucursales").innerText = "No se pudo cargar el ranking.";
        });
}

// Cargar el ranking apenas se abre la página
window.addEventListener("load", cargarRanking);
