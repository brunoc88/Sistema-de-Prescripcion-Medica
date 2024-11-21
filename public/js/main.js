const btnAddPro = document.getElementById('addProfesion');

btnAddPro.addEventListener('click', () => {
    const divProfesiones = document.getElementById("profesionContainer");

    // Clonar el primer select existente
    const originalSelect = divProfesiones.querySelector('.profesion-select');
    const nuevoSelectProfesion = originalSelect.cloneNode(true);

    // Asegúrate de que el nuevo select tiene el atributo `name`
    nuevoSelectProfesion.name = "idProfesiones2";

    // Crear contenedor para el select y botón eliminar
    const divProExtra = document.createElement('div');
    divProExtra.className = 'profesion-extra';

    divProExtra.appendChild(nuevoSelectProfesion);

    // Añadir botón eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.innerText = 'Eliminar';
    btnEliminar.addEventListener('click', () => divProExtra.remove());
    divProExtra.appendChild(btnEliminar);

    divProfesiones.appendChild(divProExtra);
});





