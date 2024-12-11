const Forma = require('../models/forma');

//GET vista index Forma y alta de la misma
exports.vistaIndexForma = async(req,res)=>{
    try {
        //listo las formas hechas
        const formas = await Forma.findAll();

        if(!formas){
            return res.status(404).json('No se encontraron formas!');
        }
        return res.status(200).render('forma/index',{formas});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

//POST alta de Forma
exports.altaForma = async(req,res)=>{
    try {
        const data = req.body;
        
        //reviso que no exista duplicado
        const forma = await Forma.findOne({where:{nombre:data.nombre}});
        if(forma){
            req.session.errorMessage = 'Ya existe una forma con ese nombre!';
            return res.status(409).redirect('/forma/index');
        }
        await Forma.create(data);
        req.session.message = `Forma: ${data.nombre} creada con exito!`;
        return res.status(200).redirect('/forma/index');
    } catch (error) {
        return res.status(500).json('Hubo un error' + error.message);
    }
}

//GET vista Editar Forma
exports.vistaEditarForma = async(req,res)=>{
    try {
        const id = req.params.id;
        //busco la forma para pasarla a la vista
        const forma = await Forma.findByPk(id);
        if(!forma){
            return res.status(404).json('No se encontro forma!');
        }
        return res.status(200).render('forma/editar',{forma});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message)
    }
}

//PATCH actualizar Forma
exports.actualizarForma = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        //compruebo que no exista duplicado
        const forma = await Forma.findOne({where:{nombre:data.nombre}});
        if(forma){
            return res.status(409).render('forma/editar',{forma,errorMessage:'Ya existe una forma registrada!'});
        }
        await Forma.update({nombre:data.nombre},{where:{idForma:id}});
        req.session.message = `Forma: ${data.nombre} actualizada con exito!`;
        return res.status(200).redirect('/forma/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH descativar Forma
exports.desactivarForma = async(req,res)=>{
    try {
        const id = req.params.id;
        const forma = await Forma.findByPk(id);
        await Forma.update({estado:false},{where:{idForma:id}});
        req.session.message = `Forma: ${forma.nombre} Descativada con exito!`;
        return res.status(200).redirect('/forma/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH reativar Forma
exports.activarForma = async(req,res)=>{
    try {
        const id = req.params.id;
        const forma = await Forma.findByPk(id);
        await Forma.update({estado:true},{where:{idForma:id}});
        req.session.message = `Forma: ${forma.nombre} Activada con exito!`;
        return res.status(200).redirect('/forma/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}