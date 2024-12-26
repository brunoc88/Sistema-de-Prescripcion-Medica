const Paciente = require('../models/paciente');
const Profesional = require('../models/profesional');
const Profesion = require('../models/profesion');
const Especialidad = require('../models/especialidad');
const ObrasSociales = require('../models/obraSocial');
const Plan = require('../models/plan');
const Turno = require('../models/turno');


// GET vista Profesionales disponibles segun Obra Social
exports.vistaProfesionalesDisponibles = async (req, res) => {
    try {
        const id = req.params.id;
        const paciente = await Paciente.findByPk(id, {
            include: [
                {
                    model: Plan,
                    include: [{
                        model: ObrasSociales
                    }
                    ]
                }

            ]
        });
        // Solamente profesionales con contrato van a poder atender pacientes activos
        // Traer profesionales relacionados a la obra social del paciente
        const profesionales = await Profesional.findAll({
            where: { estado: true },
            include: [
                { model: Profesion },
                { model: Especialidad },
                {
                    model: ObrasSociales, // Verifica que el modelo sea el correcto
                    through: {
                        attributes: [], // Excluye datos de la tabla intermedia
                    },
                    where: { id: paciente.Plan.ObraSocial.id } // Utiliza el ID de la obra social
                }
            ]
        });
        
        //res.json(paciente);
        
        return res.status(200).render('turnos/busqueda', {
            paciente,
            profesionales
        });
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}
// GET vista del Form Turno
exports.vistaTurno = async(req,res)=>{
    try {
        const id = req.params.id;
        const idPaciente = req.query.id_paciente; //obtengo el id del paciente por medio del link
        
        const paciente = await Paciente.findByPk(idPaciente, {
            include: [
                {
                    model: Plan,
                    include: [{
                        model: ObrasSociales
                    }
                    ]
                }

            ]
        });
        const profesional = await Profesional.findByPk(id,{
            where: { estado: true },
            include: [
                { model: Profesion },
                { model: Especialidad },
                {
                    model: ObrasSociales, // Verifica que el modelo sea el correcto
                    through: {
                        attributes: [], // Excluye datos de la tabla intermedia
                    },
                    where: { id: paciente.Plan.ObraSocial.id } // Utiliza el ID de la obra social
                }
            ]
        });
     
        //res.json({paciente,profesional});
        return res.status(200).render('turnos/alta',{profesional,paciente})
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

// POST Alta de turno
exports.altaTurno = async(req,res)=>{
    try {
        const data = req.body;
        const paciente = await Paciente.findOne({where:{dni:data.dni}});
        const profesional = await Profesional.findOne({where:{matricula:data.matricula},
            include:[{
                model: Profesion
            },{
                model: Especialidad
            }
        ]
        });

        //busco el paciente y profesional por si hay un error

         
        const pacienteRecu = await Paciente.findByPk(paciente.idPaciente, {
            include: [
                {
                    model: Plan,
                    include: [{
                        model: ObrasSociales
                    }
                    ]
                }

            ]
        });
     

        //busco que no haya duplicado
        const turnoExistente = await Turno.findOne({where:{id_paciente:paciente.idPaciente,id_profesional:profesional.idProfesional,fecha:data.fecha}});

        if(turnoExistente){
            return res.status(409).render('turnos/alta',{
                errorMessage : 'Ya tiene un turno registrado con el profesional en esta fecha!',
                paciente: pacienteRecu,
                profesional
            })
        }

       
        const turnito = {};
        turnito.id_paciente = paciente.idPaciente;
        turnito.id_profesional = profesional.idProfesional;
        turnito.fecha = data.fecha; 
        await Turno.create(turnito);
        req.session.message = 'Turno Generado con exito!';
        return res.status(200).redirect('/paciente/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

// PATCH bajar turno
exports.bajarTurno = async(req,res)=>{
    try {
        const id = req.params.id;
        //obtengo paciente para sacar el id del mismo para redireccionarme
        const paciente = await Turno.findOne({where:{idTurno:id}});
        await Turno.update({estado:false},{where:{idTurno:id}});
        req.session.message = 'Turno desactivado!';
        return res.status(200).redirect(`/paciente/turnos/${paciente.id_paciente}`);
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

// GET turnos actuales del Profesional
exports.turnosEmpleado = async(req,res)=>{
    try {
        const usuario = req.user;//obtengo el profesional para hacer las busquedas
        const profesional = await Profesional.findOne({where:{email:usuario.email}});

        //guardo fecha actual para comparar
        const hoy = new Date();
        const turnos = await Turno.findAll({where:{id_profesional:profesional.idProfesional,fecha:hoy,estado:true},
            include:[
                {model:Paciente,
                 include:[{
                    model: Plan,
                    include:[{
                        model: ObrasSociales
                    }]
                 }]    
            }]
        });
        
        
        return res.status(200).render('empleado/turnos',{
            turnos
        })
    } catch (error) {
        return res.status(500).json('Hubo un error ' + error.message);
    }
}