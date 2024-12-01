const Profesional = require('../models/profesional');
const Profesin = require('../models/profesion');
const REFEPS = require('../api/refeps');
const { Model, where } = require('sequelize');

exports.altaProfesional = async (req, res) => {

    try {
        const data = req.body;
        console.log(data.dni);
        if (!data) {
            return res.status(400).json('formulario vacio!');
        }

        //busco primero por dni
        const buscarProfesionalDni = await Profesional.findOne({ where: { dni: data.dni } })


        if (buscarProfesionalDni) {
            return res.status(409).json('Ya existe un profesional registrado con ese DNI!');
        }
        //busco despues por si no existe con ese dni que no haya alguien registrado con esa matricula
        const buscarPorMatricula = await Profesional.findOne({ where: { matricula: data.matricula } });
        if (buscarPorMatricula) {
            return res.status(409).json('Ya existe un profesional registrado con esa matrícula!');
        }
        //busco la profesion del profesionl para pasarla como patron de busqueda
        const ProfesionDelProfesional = await Profesin.findOne(
            {
                attributes: ['nombre'],
                where: { idProfesion: data.id_profesion }
            });


        //SI TANTO EL NOMBRE,APELLIDO,PROFESION,NUMERO DE REGISTRO Y SI ESTA HABILIDATO EN LA API
        const buscarRefeps = await REFEPS.findOne({ where: { num_registro: data.num_refeps, estado: true, nombre: data.nombre, apellido: data.apellido, profesion: ProfesionDelProfesional.nombre } });

        
        if (!buscarRefeps) {
            return res.status(404).json('No hay profesional registrado o no coincide su numero de regristro en la API');
        }

        await Profesional.create(data);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
};

