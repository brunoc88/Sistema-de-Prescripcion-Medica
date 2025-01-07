const Medicamento = require('../models/medicamento');
const Forma = require('../models/forma');
const Familia = require('../models/familia');
const Categoria = require('../models/categoria');
const Turno = require('../models/turno');
const Paciente = require('../models/paciente');
const ObraSocial = require('../models/obraSocial');
const Plan = require('../models/plan');
const Profesional = require('../models/profesional');
const Prescripcion = require('../models/prescripcion');
const MedicamentoPrescripcion = require('../models/medicamentoPrescripcion');

// GET vista Receta de Medicamentos
exports.vistaRecetaMedicamentos = async (req, res) => {
    try {
        //obtengo los medicamentos activos
        const medicamentos = await Medicamento.findAll({
            where:
                { estado: true },
            include: [{
                model: Forma
            }, {
                model: Familia
            }, {
                model: Categoria
            }
            ]
        });
        //obtengo los datos del medico y paciente por medio del turno
        const id = req.query.idTurno;
        const turno = await Turno.findByPk(id);

        const paciente = await Paciente.findOne({
            where: { idPaciente: turno.id_paciente },
            include: [{
                model: Plan,
                include:[{
                    model: ObraSocial
                }
                ]
            }
            ]
        })
        
        const medico = await Profesional.findOne({where:{idProfesional:turno.id_profesional}});
        return res.status(200).render('prescripcion/altaMedicacion',{medicamentos, paciente, medico, turno});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

// POST alta Prescripcion medicamentos
exports.altaPrescripcionMedicamentos = async (req, res) => {
    try {
        const data = req.body;
        const fecha = new Date();

        // Crear la prescripción
        const pre = {
            diagnostico: data.diagnostico,
            fecha: fecha,
            fechaVigencia: data.fechaVigencia,
            id_turno: data.id_turno,
        };

        // Guardar la prescripción y obtener la instancia creada
        const nuevaPrescripcion = await Prescripcion.create(pre);

        // Obtener el ID de la prescripción recién creada
        const idPrescripcion = nuevaPrescripcion.id_prescripcion; // Asumiendo que la columna es 'id_prescripcion'

        // Crear la relación con medicamentos
        const preMe = {
            nombreComercial: data.nombreComercial,
            dosis: data.dosis,
            administracion: data.administracion,
            idMedicamento: data.idMedicamento,
            id_prescripcion: idPrescripcion, // Utilizar el ID recién creado
        };

        // Guardar la relación en la tabla MedicamentoPrescripcion
        await MedicamentoPrescripcion.create(preMe);

        return res.status(200).json('Prescripción creada con éxito!');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
};
