const Paciente = require('../models/paciente');
const Plan = require('../models/plan');
const Obra = require('../models/obraSocial');

//listar pacientes en el index
exports.getPacienteIndex = async(req,res)=>{
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
        return res.status(200).render('paciente/index',{pacientes});
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error);
    }
}


//formulario para crear paciente
exports.formCrearPaciente = async(req, res) => {
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
        res.status(200).render('paciente/alta', {ObrasUnicas});
       //res.json(ObrasUnicas);
    } catch (error) {
        res.status(500).json('Ha ocurrido un error: ' + error.message);
    }
};

//post de paciente
exports.altaPaciente = async (req,res)=>{
    try {
        const data = req.body;
        if(!data){
            return res.status(400).send('Campos Vacios');
        }
        const buscarPaciente = await Paciente.findOne({ where: { dni: data.dni } });
        

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
        
        if(buscarPaciente){
            //return res.status(400).send('Ya existe paciente!');
            
            return res.status(409).render('paciente/alta',{
                errorMessage : 'Ya existe paciente con ese dni!',
                FormData: data,//pasar dato que el usuario habia ingresado
                //obras con planes
                ObrasUnicas
            })
        }
        await Paciente.create(data);
        //res.status(200).json({ message: 'Placiente creado con éxito!' });
        req.session.message = `Placiente: ${data.nombre +' ' + data.apellido} creado con éxito!`;
        return res.status(200).redirect('/paciente/index');
    } catch (error) {
        res.status(500).json('Error al crear Paciente' + error);
    }
}

//formulario para editar paciente
exports.formEditarPaciente = async(req,res)=>{
    try {
        return res.status(200).render('paciente/editar');
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message);
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
        req.session.message = `Paciente ${buscarPaciente.nombre +' '+buscarPaciente.apellido} eliminado con exito!}`;
        return res.status(200).redirect('/paciente/index');
    } catch (error) {
        res.status(500).json({ message: 'Error al dar de baja al Paciente', error: error.message });
    }
};

//reactivar paciente
exports.reactivarPaciente = async(req,res)=>{
    try {
        const id = req.params.id;
        const buscarPaciente = await Paciente.findByPk(id);
        if(!buscarPaciente){
            return res.status(404).json('No se encontro paciente!');
        }
        await Paciente.update({estado:true},{where:{idPaciente:id}});
        req.session.message = `Paciente: ${buscarPaciente.nombre + ' ' + buscarPaciente.apellido} Activado con `
        return res.status(200).redirect('/paciente/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message);
    }
}
