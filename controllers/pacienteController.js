const Paciente = require('../models/paciente');

exports.getPacienteIndex = async(req,res)=>{
    try {
        return res.status(200).render('paciente/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error);
    }
}

exports.altaPaciente = async (req,res)=>{
    try {
        const data = req.body;
        if(!data){
            return res.status(400).send('Campos Vacios');
        }
        const buscarPaciente = await Paciente.findByPk(data.dni);
        if(buscarPaciente){
            return res.status(400).send('Ya existe paciente!');
        }
        await Paciente.create(data);
        res.status(200).json({ message: 'Placiente creado con éxito!' });
    } catch (error) {
        res.status(500).json('Error al crear Paciente' + error);
    }
}

exports.bajaPaciente = async (req, res) => {
    try {
        const id = req.params.idPaciente;
        const buscarPaciente = await Paciente.findByPk(id);

        if (!buscarPaciente) {
            return res.status(404).json({ message: 'El Paciente no existe!' });
        }

        // Actualizar el estado del paciente a false
        await Paciente.update({ estado: false }, { where: { idPaciente: id } });

        res.status(200).send('Paciente dado de baja!');
    } catch (error) {
        res.status(500).json({ message: 'Error al dar de baja al Paciente', error: error.message });
    }
};
