// URL de tu Función de Azure
const AZURE_FUNCTION_URL = "https://dulas-the-game-api-abbmayetgkebfghn.centralus-01.azurewebsites.net/api/guardarPuntaje";

// Función global para guardar el puntaje desde el index.html
window.guardarPuntaje = async function(nombre, correo, celular, puntaje) {
    console.log("Enviando datos a Azure...");
    try {
        const respuesta = await fetch(AZURE_FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, correo, celular, puntaje })
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