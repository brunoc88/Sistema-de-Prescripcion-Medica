document.getElementById('add-medicamento').addEventListener('click', () => {
    const container = document.getElementById('medicamentos-container');
    const medicamentoItem = document.querySelector('.medicamento-item');
    const newMedicamento = medicamentoItem.cloneNode(true);

    // Limpiar los valores de los campos en el nuevo medicamento
    newMedicamento.querySelectorAll('input, textarea').forEach(input => input.value = '');
    container.appendChild(newMedicamento);
});
