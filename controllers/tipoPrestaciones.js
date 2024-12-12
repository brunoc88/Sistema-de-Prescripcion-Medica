const { error } = require('console');
const TipoPrestacion = require('../models/tipoPrestaciones');

//GET vista index y alta de Tipo Prestacion
exports.vistaIndexTipoPrestacion = async(req,res)=>{
    try {
        //listo los tipos de prestaciones
        const tipoPrestaciones = await TipoPrestacion.findAll();
        res.status(200).render('tipoPrestaciones/index',{tipoPrestaciones});
    } catch (error) {
        res.status(500).json('Hubo un error: ' + error);
    }
}

//POST tipo Tipo Prestaciones
exports.altaTipoPrestacion = async(req,res)=>{
    try {
        const data = req.body;

        //busco que no exista duplicado
        const tipo = await TipoPrestacion.findOne({where:{nombre:data.nombre}})
        if(tipo){
            req.session.errorMessage = 'Ya existe un tipo de prestacion con ese nombre!';
            return res.status(409).redirect('/tipoPrestaciones/index');
        }

        await TipoPrestacion.create(data);
        req.session.message = `Tipo de Prestacion: ${data.nombre} creada con exito!`;
        return res.status(200).redirect('/tipoPrestaciones/index');
    } catch (error) {
        res.status(500).json('Hubo un error: ' + error);
    }
}

//GET vista Editar Tipo Prestacion
exports.vistaEditarPrestacion = async(req,res)=>{
    try {
        const id = req.params.id;
        //obtengo los datos del tipo prestacion para pasar a la vista
        const tp = await TipoPrestacion.findByPk(id);
        
        return res.status(200).render('tipoPrestaciones/editar',{tp});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}
//PATCH actualizar Tipo Prestacion
exports.actualizarTipoPrestacion = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        //busco que no exista duplicado
        const tp = await TipoPrestacion.findOne({where:{nombre:data.nombre}});
        if(tp){
            return res.status(409).render('tipoPrestaciones/editar',{
                tp,
                errorMessage: 'Ya existe ese tipo de prestacion!'
            })
        }
        await TipoPrestacion.update({nombre:data.nombre},{where:{idTipo:id}})
        req.session.message = `Tipo de Prestacion: ${data.nombre} Actualizada con exito!`;
        return res.status(200).redirect('/tipoPrestaciones/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}
//PATCH desactivar Tipo Prestacion
exports.bajarTipoPrestacion = async(req,res)=>{
    try {
        const id = req.params.id;
        const tp = await TipoPrestacion.findByPk(id);
        await TipoPrestacion.update({estado:false},{where:{idTipo:id}})
        req.session.message = `Tipo Prestacion: ${tp.nombre} desactivada!`;
        return res.status(200).redirect('/tipoPrestaciones/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}
//PATCH activar Tipo Prestacion
exports.activarTipoPrestacion = async(req,res)=>{
    try {
        const id = req.params.id;
        const tp = await TipoPrestacion.findByPk(id);
        await TipoPrestacion.update({estado:true},{where:{idTipo:id}})
        req.session.message = `Tipo Prestacion: ${tp.nombre} activada!`;
        return res.status(200).redirect('/tipoPrestaciones/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}