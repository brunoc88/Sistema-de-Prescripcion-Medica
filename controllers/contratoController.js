const { Op,where } = require('sequelize');
const Contrato = require('../models/contrato');
const Profesional = require('../models/profesional');
const Usuario = require('../models/usuario');
//GET vista index de Contrato
exports.vistaIndexContrato = async(req,res)=>{
    try {
        //Listo los contratos tanto activos como inactivos
        
        const contratos = await Contrato.findAll({
            include:{
                model: Profesional
            }
        });
        //listo los nombres que no tienen contratos para mostrarlos al usuario
        const sinContrato = [];
        for(var contrato of contratos){
            if(!contrato.estado){
                sinContrato.push(contrato.Profesional.nombre + " " + contrato.Profesional.apellido);
            }
        } 
        //res.json(contratos);
        //res.json(sinContrato);
        // Si hay profesionales sin contrato, se crea un mensaje
        //con join combierte todos los nombres en una sola cadena!
        let mensaje = sinContrato.length > 0 ? `Contratos caducados de: ${sinContrato.join(', ')}` : 'No hay contratos caducados.';

        // Asignamos el mensaje a la sesión
        req.session.errorMessage = mensaje;
        return res.status(200).render('contrato/index',contratos);
    } catch (error) {
        return res.status(500).json('Hubo un error: '+ error);
    }
}

//GET vista alta Contrato
exports.vistaAltaContrato = async(req,res)=>{
    try {
        //actualizo los contratos por si vencieron, osea desactico el contrato y a la vez el paciente
        await actualizarContratos();
        //listo los usuarios activos y su rol sea de admin
        const usuarios = await Usuario.findAll({where:{estado:true , rol:'admin'}});
        //listo los profesionales inactivos sin contrato
        const profesionales = await Profesional.findAll({where:{estado:false}});

        //busco que existen usuarios
        if(!usuarios || !profesionales){
            return res.status(404).json('no existen registrados!');
        }

        //renderiso la vista y paso la lista de usuarios y profesionales
        return res.status(200).render('contrato/alta',{usuarios,profesionales});
    } catch (error) {
        return res.status(500).json('Hubo un error: '+ error);
    }
}

//POST alta de contrato
exports.altaContrato = async (req, res) => {
    try {
        const data = req.body;

        // Verificamos si el profesional ya tiene un contrato vigente
        const contratoExistente = await Contrato.findOne({
            where: {
                id_profesional: data.id_profesional,
                fechaCaducidad: {
                    //gte significa mayor que o igual que. ejemplo si mi fechar actual >= que la de fechaCaudidad
                    [Op.gte]: new Date(), // Contratos que aún no han vencido
                },
            },
        });

        if (contratoExistente) {
            req.session.message = 'El profesional ya tiene un contrato vigente.';
            return res.status(400).redirect('/contrato/alta');
        }

        // Creamos el nuevo contrato
        await Contrato.create(data);

        // Activamos el estado del profesional
        await Profesional.update({ estado: true }, { where: { idProfesional: data.id_profesional } });

        req.session.message = 'Contrato creado con éxito!';
        return res.status(200).redirect('/contrato/index');
    } catch (error) {
        return res.status(500).send('Hubo un error: ' + error.message);
    }
};


//Controlar contratos vencidos al iniciar el sistema o consultar
const actualizarContratos = async () => {
    try {
        const hoy = new Date();

        // Encontrar contratos vencidos
        const contratosVencidos = await Contrato.findAll({
            where: {
                fechaCaducidad: {
                    [Op.lt]: hoy // Contratos cuya fecha de caducidad es menor a hoy
                },
                estado: true // Solo los contratos activos
            }
        });

        // Actualizar estado de contratos y profesionales asociados
        for (const contrato of contratosVencidos) {
            await contrato.update({ estado: false }); // Cambiar estado del contrato

            // Cambiar estado del profesional asociado
            await Profesional.update(
                { estado: false },
                { where: { idProfesional: contrato.id_profesional } }
            );
        }

        console.log('Contratos y profesionales actualizados correctamente.');
    } catch (error) {
        console.error('Error actualizando contratos:', error);
    }
};