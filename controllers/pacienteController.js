const Paciente = require('../models/paciente');
const Plan = require('../models/plan');
const Obra = require('../models/obraSocial');

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
        // Buscar las obras sociales activas
        const obraSociales = await Obra.findAll({ where: { estado: true } });

        if (!obraSociales || obraSociales.length === 0) {
            return res.status(400).json('No hay obras sociales disponibles');
        }

        // Renderizar la vista con las obras sociales
        res.status(200).render('paciente/alta', { obraSociales });
    } catch (error) {
        res.status(500).json('Ha ocurrido un error: ' + error.message);
    }
};




exports.altaPaciente = async (req,res)=>{
    try {
        const data = req.body;
        if(!data){
            return res.status(400).send('Campos Vacios');
        }
        const buscarPaciente = await Paciente.findOne({ where: { dni: data.dni } });
        //const planes = await Plan.findAll({where:{estado:true}});//le paso de nuevo los planes
        const obraSociales = await Obra.findAll({where:{estado:true}});
        if(buscarPaciente){
            //return res.status(400).send('Ya existe paciente!');
            
            return res.status(404).render('paciente/alta',{
                errorMessage : 'Ya existe paciente con ese dni!',
                FormData: data,//pasar dato que el usuario habia ingresado
                //planes
                obraSociales
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

exports.bajaPaciente = async (req, res) => {
    try {
        const id = req.params.idPaciente;
        const buscarPaciente = await Paciente.findByPk(id);

        if (!buscarPaciente) {
            return res.status(404).json({ message: 'El Paciente no existe!' });
        }

        // Actualizar el estado del paciente a false
        await Paciente.update({ estado: false }, { where: { idPaciente: id } });

        res.status(200).send('Paciente dado de baja!');
    } catch (error) {
        res.status(500).json({ message: 'Error al dar de baja al Paciente', error: error.message });
    }
};
