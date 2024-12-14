document.addEventListener('DOMContentLoaded', async () => {
    const obraSelect = document.getElementById("obra"); // Select de obra social
    const planSelect = document.getElementById("id_plan"); // Select de planes

    // Función para cargar los planes basados en la obra social seleccionada
    async function cargarPlanes(obraNombre) {
        planSelect.innerHTML = ""; // Limpiamos las opciones de planes

        if (!obraNombre) {
            // Si no hay una obra seleccionada, mostramos una opción deshabilitada
            const option = document.createElement("option");
            option.value = "";
            option.disabled = true;
            option.selected = true;
            option.textContent = "Seleccione una obra social primero";
            planSelect.appendChild(option);
            return;
        }

        try {
            // Llamada al servidor para obtener los planes disponibles
            const response = await fetch(`/plan/obraPlanes/${obraNombre}`);

            if (!response.ok) {
                throw new Error('No se pudieron obtener los planes');
            }

            const planes = await response.json();

            if (planes.length > 0) {
                // Agregar los planes al select
                planes.forEach(plan => {
                    const option = document.createElement("option");
                    option.value = plan.idPlan;
                    option.textContent = plan.nombre;
                    planSelect.appendChild(option);
                });
            } else {
                // Mostrar mensaje si no hay planes disponibles
                const option = document.createElement("option");
                option.value = "";
                option.disabled = true;
                option.textContent = "No hay planes disponibles";
                planSelect.appendChild(option);
            }
        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error en el select
            const option = document.createElement("option");
            option.value = "";
            option.disabled = true;
            option.textContent = "Error al cargar planes";
            planSelect.appendChild(option);
        }
    }

    // Evento inicial: cargar planes para la obra social seleccionada al cargar la página
    await cargarPlanes(obraSelect.value);

    // Evento: cargar planes cuando cambia la obra social seleccionada
    obraSelect.addEventListener('change', async (event) => {
        const selectedObra = event.target.value;
        await cargarPlanes(selectedObra);
    });
});
