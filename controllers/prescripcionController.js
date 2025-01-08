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
const TipoPrestacion = require('../models/tipoPrestaciones');
const Prestacion = require('../models/prestacion');

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
                include: [{
                    model: ObraSocial
                }
                ]
            }
            ]
        })

        const medico = await Profesional.findOne({ where: { idProfesional: turno.id_profesional } });
        return res.status(200).render('prescripcion/altaMedicacion', { medicamentos, paciente, medico, turno });
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
        const prescripcion = {
            diagnostico: data.diagnostico,
            fecha: fecha,
            fechaVigencia: data.fechaVigencia,
            id_turno: data.id_turno,
        };

        // Insertar la prescripción
        const nuevaPrescripcion = await Prescripcion.create(prescripcion);

        // Asegúrate de que `medicamentos` sea siempre un arreglo, incluso si solo hay un medicamento
        const medicamentos = Array.isArray(data['medicamentos[][id_medicamento]'])
            ? data['medicamentos[][id_medicamento]']
            : [data['medicamentos[][id_medicamento]']];

        // Iterar sobre los medicamentos y crear las relaciones
        if (Array.isArray(medicamentos)) {
            for (let i = 0; i < medicamentos.length; i++) {
                const medicamento = {
                    id_medicamento: medicamentos[i],
                    nombreComercial: data['medicamentos[][nombreComercial]'][i] || null,
                    dosis: data['medicamentos[][dosis]'][i],
                    administracion: data['medicamentos[][administracion]'][i],
                    id_prescripcion: nuevaPrescripcion.idPrescripcion
                };
        
                // Guardar el medicamento en la base de datos
                await MedicamentoPrescripcion.create(medicamento);
            }
        }

        return res.status(200).json('Prescripción creada con éxito!');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Hubo un error: ' + error.message);
    }
};

// GET vista Prestaciones
exports.vistaPrescripcionPrestaciones = async (req,res) =>{
    try {

        //obtengo los datos del medico y paciente por medio del turno
        const id = req.query.idTurno;
        const turno = await Turno.findByPk(id);

        const paciente = await Paciente.findOne({
            where: { idPaciente: turno.id_paciente },
            include: [{
                model: Plan,
                include: [{
                    model: ObraSocial
                }
                ]
            }
            ]
        })

        const tipos = await TipoPrestacion.findAll({where:{estado:true}});

        return res.status(200).render('prescripcion/altaPrestacion',{tipos, turno, paciente})
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

// POST alta Prescripcion Prestacion
exports.altaPrescripcionPrestaciones = async(req,res)=>{
    try {
        const data = req.body;
        const fecha = new Date();

        // Crear la prescripción
        const prescripcion = {
            diagnostico: data.diagnostico,
            fecha: fecha,
            fechaVigencia: data.fechaVigencia,
            id_turno: data.id_turno,
        };

        // Insertar la prescripción
        const nuevaPrescripcion = await Prescripcion.create(prescripcion);

        
        const prestaciones = Array.isArray(data['prestaciones[][id_tipo_prestacion]'])
            ? data['prestaciones[][id_tipo_prestacion]']
            : [data['prestaciones[][id_tipo_prestacion]']];

            if (Array.isArray(prestaciones)) {
                for (let i = 0; i < prestaciones.length; i++) {
                    const prestacion = {
                        id_tipo_prestacion: prestaciones[i], // Correcto, mapeando al campo que recibes
                        lado: data['prestaciones[][lado]'][i],
                        indicacion: data['prestaciones[][indicacion]'][i],
                        justificacion: data['prestaciones[][justificacion]'][i],
                        id_prescripcion: nuevaPrescripcion.idPrescripcion
                    };
                    
                    // Guardar la prestación en la base de datos
                    await Prestacion.create(prestacion);
                }
            }
            

        return res.status(200).json('Prescripción creada con éxito!');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}