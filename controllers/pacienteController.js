const Paciente = require('../models/paciente');

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