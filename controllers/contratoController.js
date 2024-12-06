const { Op, where } = require('sequelize');
const Contrato = require('../models/contrato');
const Profesional = require('../models/profesional');
const Profesion = require('../models/profesion');
const Especialidad = require('../models/especialidad');
const Usuario = require('../models/usuario');
const PDFDocument = require('pdfkit');//necesario para pdf


//GET vista index de Contrato
exports.vistaIndexContrato = async (req, res) => {
    try {
        //Listo los contratos tanto activos como inactivos

        const contratos = await Contrato.findAll({
            include: {
                model: Profesional,
                include: {
                    model: Profesion
                }
            }
        });
        //listo los nombres que no tienen contratos para mostrarlos al usuario
        const sinContrato = [];
        for (var contrato of contratos) {
            if (!contrato.estado) {
                sinContrato.push(contrato.Profesional.nombre + " " + contrato.Profesional.apellido);
            }
        }
        //res.json(contratos);
        //res.json(sinContrato);
        // Si hay profesionales sin contrato, se crea un mensaje
        //con join combierte todos los nombres en una sola cadena!
        let mensaje = sinContrato.length > 0 ? `Contratos caducados de: ${sinContrato.join(', ')}` : 'No hay contratos caducados.';

        // Asignamos el mensaje a la sesión
        //req.session.errorMessage = mensaje;
        //res.json(contratos);
        return res.status(200).render('contrato/index', { contratos });
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

//GET vista alta Contrato
exports.vistaAltaContrato = async (req, res) => {
    try {
        //actualizo los contratos por si vencieron, osea desactico el contrato y a la vez el paciente
        await actualizarContratos();
        //listo los usuarios activos y su rol sea de admin
        const usuarios = await Usuario.findAll({ where: { estado: true, rol: 'admin' } });
        //listo los profesionales inactivos sin contrato
        const profesionales = await Profesional.findAll({ where: { estado: false } });

        //busco que existen usuarios
        if (!usuarios || !profesionales) {
            return res.status(404).json('no existen registrados!');
        }

        //renderiso la vista y paso la lista de usuarios y profesionales
        return res.status(200).render('contrato/alta', { usuarios, profesionales });

    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

//POST alta de contrato
exports.altaContrato = async (req, res) => {
    try {
        const data = req.body;

        // Verificamos si el profesional ya tiene un contrato vigente o si se cancelo antes de tiempo
        const contratoExistente = await Contrato.findOne({
            where: {
                id_profesional: data.id_profesional,
                fechaCaducidad: {
                    //gte significa mayor que o igual que.
                    //compraro la fechaCaducidad con la fecha actual
                    [Op.gte]: new Date(), // Contratos que aún no han vencido
                },
                estado: true // Solo contratos activos
            },
        });

        if (contratoExistente) {
            req.session.message = 'El profesional ya tiene un contrato vigente.';
            return res.status(400).redirect('/contrato/alta');
        }
        
        // Fecha actual
        let hoy = new Date();

        // Asegurémonos de que data.fechaCaducidad esté en formato de fecha
        let fechaCaducidad = new Date(data.fechaCaducidad);

        if (fechaCaducidad < hoy) {
            //actualizo los contratos por si vencieron, osea desactico el contrato y a la vez el paciente
            await actualizarContratos();
            //listo los usuarios activos y su rol sea de admin
            const usuarios = await Usuario.findAll({ where: { estado: true, rol: 'admin' } });
            //listo los profesionales inactivos sin contrato
            const profesionales = await Profesional.findAll({ where: { estado: false } });
            
            return res.render('contrato/alta', {
                usuarios,
                profesionales,
                FormData: {
                    id_usuario: data.id,
                    id_profesional: data.idProfesional
                },
                errorMessage : 'No puede ingresar una fecha de caducida menor a la fecha actual'
            });
        }
        data.fechaCreacion = hoy;
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


//GET vistaEditarContrato
exports.vistaEditarContrato = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Busco el contrato por id y que este activo
        const contrato = await Contrato.findOne({
            where: { idContrato: id, estado:true},
            include: [
                {
                    model: Profesional
                },
                {
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'email','estado'] 
                }
            ]  
        });

        // Si no se encuentra el contrato, se retorna un error
        if (!contrato) {
            return res.status(404).json('Contrato no encontrado');
        }

        // Retornar los datos del contrato encontrado
        //res.json(contrato);
        //le paso los datos del contrato con la info del profesional y el usuario que hice la contratacion
        return res.status(200).render('contrato/editar',{contrato});
    } catch (error) {
        return res.status(500).json('Hubo un problema: ' + error.message);
    }
};

//PATCH actualizar Fecha de caducidad de contrato
exports.actualizarFechaContrato = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;

        const contrato = await Contrato.findByPk(id,{
            include:[
                {
                model: Profesional
                },
                {model: Usuario

                }]
        });
        
        //extraigo las fechas para ceeompararlas
        const fechaCaducidadOriginal = contrato.fechaCaducidad;
        const nuevaFechaCaducidad = data.fechaCaducidad;
       

        
        //compruebo que la fecha nueva de caducidad sea menor que la original
        if(nuevaFechaCaducidad > fechaCaducidadOriginal){
            return res.render('contrato/editar',{contrato, errorMessage:'Ingreso una fecha mayor a la de caducidad!'})
        }
      
        await Contrato.update({fechaCaducidad:nuevaFechaCaducidad},{where:{idContrato:id}})
        req.session.message = `Contrato actualizado con exito!`;
        return res.status(200).redirect('/contrato/index');
        //return res.json(contrato);

    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}
//PATCH de reactivar Contrato(NO SE PUEDE REACTIVAR CONTRATO UNA VEZ FINALIZADO)!
exports.reactivarContrato = async (req, res) => {
    try {
        req.session.errorMessage = 'No se puede reactivar contrato una vez finalizado!';
        return res.redirect('/contrato/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}
//PATCH desactivar Contrato que a su vez desactiva el profesional
exports.desactivarContrato = async(req,res)=>{
    try {
        const id = req.params.id;
        const contrato = await Contrato.findByPk(id);

        if(!contrato){
            return res.status(404).json('No se encontro contrato!');
        }
        await Contrato.update({estado:false},{where:{idContrato:id}})
        await Profesional.update({estado:false},{where:{idProfesional:contrato.id_profesional}});
        req.session.message = 'Contrato desactivado!';
        return res.status(200).redirect('/contrato/index');
    } catch (error) {
        return res.status(500).json('Hubo un problema: '+ error.message);
    }
}
//GET obtengo el dato de ese contrato
exports.fichaContratoProfesional = async(req,res)=>{
    try {
        const id = req.params.id;
        //busco contrato del profesional
        const contrato = await Contrato.findOne({
            where:{idContrato:id},
            include:[{
                model: Profesional,
                include:[{
                    model: Profesion
                },{
                    model: Especialidad
                }]},{
                    model: Usuario
                }]
            }
        )
        return res.render('contrato/historial',{contrato});
        //res.json(contrato);
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

// Ruta para descargar contrato en PDF
exports.descargarContratoPDF = async(req, res) => {
    try {
        const id = req.params.id;
        const contrato = await Contrato.findOne({
            where: { idContrato: id },
            include: [{
                model: Profesional,
                include: [{
                    model: Profesion
                }, {
                    model: Especialidad
                }]
            }, {
                model: Usuario
            }]
        });

        if (!contrato) {
            return res.status(404).json('Contrato no encontrado');
        }

        // Crear un documento PDF
        const doc = new PDFDocument();
        
        // Definir el encabezado y los detalles del contrato
        doc.text(`Contrato ##${contrato.idContrato}`, { align: 'center' });
        doc.moveDown();
        doc.text(`Fecha de Creación: ${contrato.fechaCreacion}`);
        doc.text(`Fecha de Caducidad: ${contrato.fechaCaducidad}`);
        doc.text(`Estado: ${contrato.estado ? 'Activo' : 'Inactivo'}`);
        doc.moveDown();

        // Detalles del profesional
        doc.text(`Profesional: ${contrato.Profesional.nombre} ${contrato.Profesional.apellido}`);
        doc.text(`Domicilio: ${contrato.Profesional.domicilio}`);
        doc.text(`Email: ${contrato.Profesional.email}`);
        doc.text(`Profesión: ${contrato.Profesional.Profesion.nombre}`);
        doc.text(`Especialidad: ${contrato.Profesional.Especialidad.nombre}`);
        doc.moveDown();

        // Detalles del usuario
        doc.text(`Usuario: ${contrato.Usuario.nombre} ${contrato.Usuario.apellido}`);
        doc.text(`Rol: ${contrato.Usuario.rol}`);
        doc.text(`Email: ${contrato.Usuario.email}`);

        // Finalizar documento y enviar como respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=contrato_' + contrato.idContrato + '.pdf');
        doc.pipe(res);
        doc.end();

    } catch (error) {
        res.status(500).json('Error al generar el PDF: ' + error.message);
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