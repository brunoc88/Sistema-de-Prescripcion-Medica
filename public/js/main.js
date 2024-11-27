document.addEventListener('DOMContentLoaded', async () => {
    const obraSelect = document.getElementById("obra"); // Aquí seleccionamos el select de obra social
    const obraNombre = obraSelect.value;  // Este es el valor de la obra social seleccionada

    // Asegurarse de que haya una obra seleccionada al cargar la página
    if (obraNombre) {
        const planSelect = document.getElementById("id_plan"); // Seleccionamos el select de planes
        planSelect.innerHTML = "";  // Limpiamos las opciones de planes para evitar mostrar datos obsoletos de una selección anterior

        try {
            // Hacemos una solicitud a nuestro servidor para obtener los planes disponibles para la obra social seleccionada
            const response = await fetch(`/plan/obraPlanes/${obraNombre}`);

            if (!response.ok) {
                throw new Error('No se pudieron obtener los planes');
            }

            const planes = await response.json(); // Esto nos dará un array de objetos con la información de los planes.

            // Si hay planes disponibles, los agregamos al select
            if (planes.length > 0) {
                planes.forEach(plan => {
                    const option = document.createElement("option"); // Creamos una nueva opción para el select
                    option.value = plan.idPlan; // Asignamos el ID del plan como valor
                    option.textContent = plan.nombre; // El nombre del plan es lo que verá el usuario en la lista
                    planSelect.appendChild(option); // Agregamos la opción creada al select
                });
            } else {
                // Si no hay planes disponibles, mostramos un mensaje en el select
                const option = document.createElement("option");
                option.value = "";
                option.disabled = true;
                option.textContent = "No hay planes disponibles";
                planSelect.appendChild(option);
            }
        } catch (error) {
            console.error(error); 
            alert('Hubo un error al obtener los planes');
        }
    }

    // Evento que escucha cuando el usuario cambia de obra social
    obraSelect.addEventListener('change', async (event) => {
        const selectedObra = event.target.value; // Obtenemos la nueva obra social seleccionada
        const planSelect = document.getElementById("id_plan");
        planSelect.innerHTML = "";  // Limpiamos el select de planes

        if (selectedObra) {
            try {
                const response = await fetch(`/plan/obraPlanes/${selectedObra}`);

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los planes');
                }

                const planes = await response.json();

                if (planes.length > 0) {
                    planes.forEach(plan => {
                        const option = document.createElement("option");
                        option.value = plan.idPlan;
                        option.textContent = plan.nombre;
                        planSelect.appendChild(option);
                    });
                } else {
                    const option = document.createElement("option");
                    option.value = "";
                    option.disabled = true;
                    option.textContent = "No hay planes disponibles";
                    planSelect.appendChild(option);
                }
            } catch (error) {
                console.error(error);
                alert('Hubo un error al obtener los planes');
            }
        }
    });
});
