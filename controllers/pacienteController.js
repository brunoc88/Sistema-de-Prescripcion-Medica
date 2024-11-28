const Paciente = require('../models/paciente');
const Plan = require('../models/plan');
const Obra = require('../models/obraSocial');
const { Op, where } = require('sequelize');
const ObraSocial = require('../models/obraSocial');

//listar pacientes en el index
exports.getPacienteIndex = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll({
            include: [
                {
                    model: Plan, // Incluye la relación de Plan
                    attributes: ['nombre'],
                    include: [
                        {
                            model: Obra, // Luego, incluye la relación de ObraSocial a través de Plan
                            attributes: ['nombre']
                        }
                    ]
                }
            ]
        });


        //res.json(pacientes);
        return res.status(200).render('paciente/index', { pacientes });
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}


//formulario para crear paciente
exports.formCrearPaciente = async (req, res) => {
    try {
        // Buscar las obras sociales activas y tengan un plan
        const obraSocialesConPlanes = await Plan.findAll({
            where: { estado: true },
            include: {
                model: Obra,
                where: { estado: true },
                attributes: ['nombre', 'id']
            },
            order: [[Obra, 'nombre', 'ASC']] // Ordenar por nombre de obra social
        });

        // Extraer nombres únicos de las obras sociales
        const ObrasUnicas = [...new Set(obraSocialesConPlanes.map(plan => plan.ObraSocial.nombre))];


        if (!ObrasUnicas || ObrasUnicas.length === 0) {
            return res.status(400).json('No hay obras sociales disponibles');
        }

        // Renderizar la vista con las obras sociales
        res.status(200).render('paciente/alta', { ObrasUnicas });
        //res.json(ObrasUnicas);
    } catch (error) {
        res.status(500).json('Ha ocurrido un error: ' + error.message);
    }
};

//POST de paciente
exports.altaPaciente = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).send('Campos Vacios');
        }

        // Buscar las obras sociales activas y tengan un plan
        const obraSocialesConPlanes = await Plan.findAll({
            where: { estado: true },
            include: {
                model: Obra,
                where: { estado: true },
                attributes: ['nombre', 'id']
            },
            order: [[Obra, 'nombre', 'ASC']] // Ordenar por nombre de obra social
        });

        // Extraer nombres únicos de las obras sociales
        const ObrasUnicas = [...new Set(obraSocialesConPlanes.map(plan => plan.ObraSocial.nombre))];


        if (!ObrasUnicas || ObrasUnicas.length === 0) {
            return res.status(400).json('No hay obras sociales disponibles');
        }

        //busco si no hay un paciente registrado con ese dni
        const buscarPaciente = await Paciente.findOne({ where: { dni: data.dni } });

        if (buscarPaciente) {
            //return res.status(400).send('Ya existe paciente!');

            return res.status(409).render('paciente/alta', {
                errorMessage: 'Ya existe paciente con ese dni!',
                //recupero y paso los datos que el usuario habia escrito previo al error
                FormData: {
                    nombre: data.nombre,
                    apellido: data.apellido,
                    dni: data.dni,
                    sexo: data.sexo,
                    fechaNacimiento: data.fechaNacimiento,
                    obra: data.obra
                },
                //obras con planes
                ObrasUnicas //mando el listado de obras
            })
        }
        await Paciente.create(data);
        //res.status(200).json({ message: 'Placiente creado con éxito!' });
        req.session.message = `Placiente: ${data.nombre + ' ' + data.apellido} creado con éxito!`;
        return res.status(200).redirect('/paciente/index');
    } catch (error) {
        res.status(500).json('Error al crear Paciente' + error);
    }
}

//GET formulario para editar paciente 
exports.formEditarPaciente = async (req, res) => {
    try {
        const id = req.params.id;

        //buscar paciente por id para obtener los datos y pasarlos al form
        const paciente = await Paciente.findOne({
            where: { idPaciente: id },
            include: {
                model: Plan,
                attributes: ['nombre', 'idPlan'],
                include: {
                    model: Obra,
                    attributes: ['nombre', 'id']
                }
            }
        });

        // Buscar las obras sociales activas y tengan un plan
        const obraSocialesConPlanes = await Plan.findAll({
            where: { estado: true },
            include: {
                model: Obra,
                where: { estado: true },
                attributes: ['nombre', 'id']
            },
            order: [[Obra, 'nombre', 'ASC']] // Ordenar por nombre de obra social
        });

        // Extraer nombres únicos de las obras sociales
        const ObrasUnicas = [...new Set(obraSocialesConPlanes.map(plan => plan.ObraSocial.nombre))];


        if (!ObrasUnicas || ObrasUnicas.length === 0) {
            return res.status(400).json('No hay obras sociales disponibles');
        }

        if (!paciente) {
            return res.status(404).json('No se encontro paciente!');
        }

        return res.status(200).render('paciente/editar', { paciente, ObrasUnicas });
        //return res.status(200).json(paciente);
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PUT Editar Paciente
exports.ActualizarPaciente = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        // Buscar al paciente que se quiere actualizar
        const pacienteActual = await Paciente.findByPk(id);
        if (!pacienteActual) {
            return res.status(404).json('Paciente no encontrado.');
        }

        // Buscar las obras sociales activas y tengan un plan
        const obraSocialesConPlanes = await Plan.findAll({
            where: { estado: true },
            include: {
                model: Obra,
                where: { estado: true },
                attributes: ['nombre', 'id']
            },
            order: [[Obra, 'nombre', 'ASC']] // Ordenar por nombre de obra social
        });

        // Extraer nombres únicos de las obras sociales
        const ObrasUnicas = [...new Set(obraSocialesConPlanes.map(plan => plan.ObraSocial.nombre))];


        if (!ObrasUnicas || ObrasUnicas.length === 0) {
            return res.status(400).json('No hay obras sociales disponibles');
        }

        // Si el DNI cambió, validar que no exista en otro paciente
        if (pacienteActual.dni !== req.body.dni) {
            const dniExistente = await Paciente.findOne({
                //ne = Significa NOT EQUAL ("no igual que ")
                where: { dni: req.body.dni, idPaciente: { [Op.ne]: id } } // Excluir al paciente actual
            });

            if (dniExistente) {
                //tuve que hacer esta consulta para recuperar la obra social precargada
                const p = await Paciente.findOne({
                    where:{idPaciente:pacienteActual.idPaciente},
                    include:{
                        model: Plan,
                        attributes: ['Nombre'],
                        include:{
                            model:Obra,
                            attributes:['nombre']
                        }
                    }}
                )
                //luego hice un objeto js donde cargo la obra social
                let paciente = {
                    nombre: data.nombre,
                    apellido: data.apellido,
                    dni: data.dni,
                    sexo: data.sexo,
                    fechaNacimiento: data.fechaNacimiento,
                    Plan: {
                        ObraSocial: {
                            nombre: p.Plan.ObraSocial.nombre
                        }
                    }
                };
                
                //return res.status(409).json(paciente);
                return res.status(409).render('paciente/editar',{paciente,ObrasUnicas,errorMessage:'DNI en uso!'})
            }
        }


        await Paciente.update(data, { where: { idPaciente: id } });
        req.session.message = `Paciente: ${data.nombre + ' ' + data.apellido} Actualizado con exito!`;
        return res.status(200).redirect('/paciente/index');
        //return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message)
    }
}

//desactivar paciente
exports.bajaPaciente = async (req, res) => {
    console.log('dentro de contrololador');
    try {
        const id = req.params.id;
        const buscarPaciente = await Paciente.findByPk(id);

        if (!buscarPaciente) {
            return res.status(404).json({ message: 'El Paciente no existe!' });
        }

        // Actualizar el estado del paciente a false
        await Paciente.update({ estado: false }, { where: { idPaciente: id } });

        //res.status(200).send('Paciente dado de baja!');
        req.session.message = `Paciente ${buscarPaciente.nombre + ' ' + buscarPaciente.apellido} eliminado con exito!}`;
        return res.status(200).redirect('/paciente/index');
    } catch (error) {
        res.status(500).json({ message: 'Error al dar de baja al Paciente', error: error.message });
    }
};

//reactivar paciente
exports.reactivarPaciente = async (req, res) => {
    try {
        const id = req.params.id;
        const buscarPaciente = await Paciente.findByPk(id);
        if (!buscarPaciente) {
            return res.status(404).json('No se encontro paciente!');
        }
        await Paciente.update({ estado: true }, { where: { idPaciente: id } });
        req.session.message = `Paciente: ${buscarPaciente.nombre + ' ' + buscarPaciente.apellido} Activado con `
        return res.status(200).redirect('/paciente/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}
