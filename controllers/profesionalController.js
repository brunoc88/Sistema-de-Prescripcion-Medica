const Profesional = require('../models/profesional');
const Profesion = require('../models/profesion');
const Especialidad = require('../models/especialidad');


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


exports.altaProfesional = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json('Campo vacío!');
        }

        // Verificar si el profesional ya existe
        const buscarProfesional = await Profesional.findOne({ where: { dni: data.dni } });
        if (buscarProfesional) {
            return res.status(400).json('Profesional ya registrado!');
        }

        // Crear el nuevo profesional
        const nuevoProfesional = await Profesional.create({
            nombre: data.nombre,
            apellido: data.apellido,
            matricula: data.matricula,
            dni: data.dni,
            domicilio: data.domicilio}
        );
        const profesion = await Profesion.findByPk(data.idProfesion);

        if (!profesion) {
            return res.status(404).json({ message: "Profesión no encontrada" });
        }

        // Asociar especialidades (IDs) a la profesión
        await profesion.addEspecialidad(data.idEspecialidad);
        await nuevoProfesional.addProfesions(data.idProfesion);
        
        res.status(201).json({
            message: "Profesional creado exitosamente"
        });
    } catch (error) {
        console.error('Error al crear al profesional:', error);
        return res.status(500).json('Error al crear al profesional ' + error.message);
    }
};


exports.getForm = async (req, res) => {
    try {
        const profesiones = await Profesion.findAll({
            where:{
                estado:true
            }
        });
        const especialidades = await Especialidad.findAll({
            where:{
                estado:true
            }
    });//obtengo las especialidades
        res.render('profesional/crearPro', {
            profesiones, // Pasa las profesiones a la vista
            especialidades // Pasa las especialidades a la vista
        });
        
    } catch (error) {
        res.status(500).send("Error al obtener datos");
    }
};
