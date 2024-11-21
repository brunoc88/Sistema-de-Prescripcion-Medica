const Profesional = require('../models/profesional');
const Profesion = require('../models/profesion');
const Especialidad = require('../models/especialidad');
const { Op } = require('sequelize');//para poder hacer el or en la consulta de busqueda del profesional

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
        // Verificar si el formulario está vacío
        if (!req.body) {
            return res.status(400).json('Formulario vacío!');
        }

        // Crear el array de profesiones, considerando que pueden ser hasta 2
        let profesionesIds = [];
        
        if (req.body.idProfesiones) {
            profesionesIds.push(req.body.idProfesiones);
        }

        if (req.body.idProfesiones2) {
            profesionesIds.push(req.body.idProfesiones2);
        }

        //las paso a int porque al comienzo son strings
        if (parseInt(req.body.idProfesiones2) === parseInt(req.body.idProfesiones)) {
            return res.status(400).json('Seleccionó dos veces la misma profesión!');
        }
        

        // Validar que haya al menos una profesión seleccionada
        if (profesionesIds.length === 0) {
            return res.status(400).json('Debe seleccionar al menos una profesión!');
        }

        // Obtener los datos del profesional
        const { nombre, apellido, dni, matricula, domicilio } = req.body;

        const buscarProfesional = await Profesional.findOne({
            where: {
              [Op.or]: [
                { dni: dni },
                { matricula: matricula }
              ]
            }
          });
          if(buscarProfesional){
            return res.status(400).json('Ya existe un profesional registrado!');
          }
        // Crear el profesional
        const nuevoProfesional = await Profesional.create({
            nombre,
            apellido,
            dni,
            matricula,
            domicilio
        });

        // Buscar las profesiones seleccionadas
        const profesiones = await Profesion.findAll({
            where: {
                idProfesion: profesionesIds // Buscar profesiones por los ids seleccionados
            }
        });

        // Verificar si las profesiones seleccionadas existen
        if (profesiones.length !== profesionesIds.length) {
            return res.status(400).json('Algunas profesiones seleccionadas no existen!');
        }

        // Asociar las profesiones al profesional
        await nuevoProfesional.addProfesions(profesiones);

        res.status(201).json({ message: "Profesional creado exitosamente" });
    } catch (error) {
        console.error('Error al crear al profesional:', error);
        res.status(500).json('Error al crear al profesional ' + error.message);
    }
};




exports.getForm = async (req, res) => {
    try {
        const profesiones = await Profesion.findAll({
            where: {
                estado: true
            }
        });
        const especialidades = await Especialidad.findAll({
            where: {
                estado: true
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
