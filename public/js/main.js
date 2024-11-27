// Este bloque de código se ejecutará cuando todo el contenido del DOM haya sido cargado completamente.
// Esto es importante porque queremos asegurarnos de que todos los elementos HTML estén disponibles para manipularlos.
document.addEventListener('DOMContentLoaded', async () => {
    
    // Primero obtenemos el valor seleccionado en el select de obra social, para saber cuál fue la opción elegida
    const obraSelect = document.getElementById("obra"); // Aquí seleccionamos el elemento por su id
    const obraId = obraSelect.value;  // Este es el valor de la obra social seleccionada

    // Si no hay ninguna obra seleccionada (por ejemplo, si está en la opción por defecto o vacía), no hacemos nada.
    if (obraId) {
        const planSelect = document.getElementById("id_plan"); // Seleccionamos el select de planes
        planSelect.innerHTML = "";  // Limpiamos las opciones de planes para evitar mostrar datos obsoletos de una selección anterior

        try {
            // Ahora hacemos una solicitud a nuestro servidor para obtener los planes disponibles para la obra social seleccionada
            // Esto se hace con la función fetch() que nos devuelve una promesa. Como estamos trabajando con datos asíncronos, usamos 'await' para esperar la respuesta.
            const response = await fetch(`/plan/obraPlanes/${obraId}`);

            // Comprobamos si la respuesta del servidor fue exitosa. Si no es así, lanzamos un error.
            if (!response.ok) {
                throw new Error('No se pudieron obtener los planes');
            }

            // Si la respuesta es exitosa, intentamos obtener los datos de los planes en formato JSON
            const planes = await response.json(); // Esto nos dará un array de objetos con la información de los planes.

            // Si el array de planes no está vacío, agregamos cada plan como una opción al select de planes
            if (planes.length > 0) {
                // Iteramos sobre el array de planes y creamos un <option> por cada plan recibido
                planes.forEach(plan => {
                    const option = document.createElement("option"); // Creamos una nueva opción para el select
                    option.value = plan.idPlan; // Asignamos el ID del plan como valor
                    option.textContent = plan.nombre; // El nombre del plan es lo que verá el usuario en la lista
                    planSelect.appendChild(option); // Agregamos la opción creada al select
                });
            } else {
                // Si no hay planes disponibles para esa obra, mostramos un mensaje en el select para que el usuario sepa
                const option = document.createElement("option");
                option.value = ""; // No asignamos un valor, ya que esta opción no debe ser seleccionable
                option.disabled = true; // Deshabilitamos esta opción para que no pueda seleccionarse
                option.textContent = "No hay planes disponibles"; // Texto que se muestra al usuario
                planSelect.appendChild(option); // Agregamos la opción "sin planes" al select
            }

        } catch (error) {
            // Si ocurre un error en la petición o en el procesamiento de los datos, lo capturamos aquí
            console.error(error); // Esto nos ayudará a ver qué ocurrió en la consola para poder depurar
            alert('Hubo un error al obtener los planes'); // Notificamos al usuario que algo salió mal
        }
    }
});
