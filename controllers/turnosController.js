const Paciente = require('../models/paciente');
const Profesional = require('../models/profesional');
const Profesion = require('../models/profesion');
const Especialidad = require('../models/especialidad');
const ObrasSociales = require('../models/obraSocial');
const Plan = require('../models/plan');
const Turno = require('../models/turno');


//vista Formulario para turnos
exports.vistaFormTurnos = async (req, res) => {
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
        //solamente profesionales con contrato van a poder atender pacientes activos
        //traer medicos relacionados a la obra social del paciente
        const profesionales = await Profesional.findAll({
            where: { estado: true },
            include: [{
                model: Profesion
            },
            {
                model: Especialidad
            },{
                model: ObrasSociales,
                through: {
                    attributes: [], // Opcional: Excluye los datos de la tabla intermedia
                }
            }
            ]
        });
        //paso las profesionaes, especialidades, obras sociales activas relacionadas a profesionales contratados
        // Creo arrays con las profesiones y eliminar duplicados
        const profesiones = [...new Set(profesionales.map(pro => pro.Profesion?.nombre).filter(nombre => nombre !== null))]
        const especialidades = [...new Set(profesionales.map(pro => pro.Especialidad?.nombre).filter(nombre => nombre !== null))]
        //const especialidades = await Especialidad.findAll({ where: { estado: true } });
        const obrasSociales = await ObrasSociales.findAll({ where: { estado: true } });

        
        res.json(profesionales);
        /*
        return res.status(200).render('turnos/turno', {
            paciente,
            profesionales,
            profesiones,
            especialidades,
            obrasSociales
        });*/
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}