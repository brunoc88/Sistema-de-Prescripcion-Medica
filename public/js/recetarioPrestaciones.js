document.getElementById('add-prestacion').addEventListener('click', () => {
    const container = document.getElementById('prestaciones-container');
    const prestacionItem = document.querySelector('.prestacion-item');
    const newPrestacion = prestacionItem.cloneNode(true);

    // Limpiar los valores de los campos en el nuevo item
    newPrestacion.querySelectorAll('input, select, textarea').forEach(input => input.value = '');

    // Añadir el nuevo item al contenedor
    container.appendChild(newPrestacion);
});
