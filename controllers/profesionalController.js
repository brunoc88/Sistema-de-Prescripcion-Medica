const Profesional = require('../models/profesional');

exports.altaProfesional = async (req,res)=>{
    try {
        const data = req.body;
        if(!data){
            return res.status(400).json('campos vacios!');
        }
        const buscarProfesional = await Profesional.findOne({ where: { dni: data.dni } });
        if(buscarProfesional){
            return res.status(400).json('El profesional ya existe!');
        }
        await Profesional.create(data);
        res.status(200).json('Profesional creado!');
    } catch (error) {
        return res.status(500).json('Error al crear al profesional' + crear);
    }
}

exports.bajarProfesional = async (req, res) => {
    try {
        const id = req.params.idProfesional; 

        // Buscar el profesional por ID
        const buscarProfesional = await Profesional.findByPk(id);

        if (!buscarProfesional) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }

        // Actualizar estado a false para baja lógica
        await Profesional.update({ estado: false }, { where: { idProfesional: id } });

        res.status(200).json({ message: 'Profesional eliminado lógicamente' });
    } catch (error) {
        console.error('Error al borrar Profesional:', error);
        res.status(500).json({ message: 'Error interno al borrar profesional', error: error.message });
    }
};
