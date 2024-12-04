const Profesional = require('../models/profesional');
const Profesion = require('../models/profesion');
const Especialidad = require('../models/especialidad');
const Contrato = require('../models/contrato');
const REFEPS = require('../api/refeps');
const { where } = require('sequelize');



exports.indexProfesional = async(req,res)=>{
    try {
        //listar profesionales con su profesion y especialidad

        const profesionales = await Profesional.findAll({
            include: [
                {
                    model: Especialidad,
                    attributes: ['nombre']
                },
                {
                    model: Profesion,
                    attributes: ['nombre']
                }
            ]
        });

        if(!profesionales){
            return res.status(404).json('No se encontraron Profesionales registrados!');
        }
        //res.status(200).json(profesionales);
        return res.status(200).render('profesional/index',{profesionales});
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message);
    }
}

exports.vistaAltaProfesional = async(req,res)=>{
    try {
        //listo las profesiones activas
        const profesiones = await Profesion.findAll({where:{estado:true}});
        //listo la especilaidades activas
        const especialidades = await Especialidad.findAll({where:{estado:true}});
        return res.status(200).render('profesional/alta',{profesiones,especialidades});
        //res.json(profesiones,especialidades);
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message)
    }
}


exports.altaProfesional = async (req, res) => {

    try {
        const data = req.body;
        console.log("nombre:" + ""+data.nombre)
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
        const ProfesionDelProfesional = await Profesion.findOne(
            {
                attributes: ['nombre'],
                where: { idProfesion: data.id_profesion }
            });

        console.log("Profesion de " + data.nombre +""+ProfesionDelProfesional.nombre);
        //SI TANTO EL NOMBRE,APELLIDO,PROFESION,NUMERO DE REGISTRO Y SI ESTA HABILIDATO EN LA API
        const buscarRefeps = await REFEPS.findOne({ where: { num_registro: data.num_refeps, estado: true, nombre: data.nombre, apellido: data.apellido, profesion: ProfesionDelProfesional.nombre } });

        
        if (!buscarRefeps) {
            return res.status(404).json('No hay profesional registrado o no coincide su numero de regristro en la API');
        }

        await Profesional.create(data);
        //return res.status(200).json(data);
        req.session.message = `Profesional: ${data.nombre + " " + data.apellido} creado con exito!`;
        return res.status(200).redirect('/profesiona/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
};

exports.reactivarUnProfesional = async(req,res)=>{
    try {
        const id = req.params.id
        //busco si el profesional esta relacionado con algun contrato activo
        const profesional = await Contrato.findOne({ where: { id_profesional: id,estado:true } });
        
        req.session.errorMessage = "solamente se puede reactivar mediante contrato";
        return res.redirect('/profesional/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' +error.message);
    }
}