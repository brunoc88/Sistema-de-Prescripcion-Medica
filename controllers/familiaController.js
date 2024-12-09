const Familia = require('../models/familia');

//GET de vista index Familia y a la vez la vista de altas
exports.vistaIndexFamilia = async(req,res)=>{
    try {
        //listo las familias
        const familias = await Familia.findAll();

        if(!familias){
            return res.status(404).json('No se encontraton familias!');
        }
        return res.status(200).render('familia/index',{familias});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

//POST de familia
exports.altaFamilia = async(req,res)=>{
    try {
        const data = req.body;
        
        //busco que no hay duplicado
        const familia = await Familia.findOne({where:{nombre:data.nombre}})
        if(familia){
            req.session.errorMessage = 'Ya existe una familia con ese nombre!';
            return res.status(409).redirect('/familia/index');
        }
        await Familia.create(data);
        req.session.message = `Familia: ${data.nombre} creada con exito!`;
        return res.status(200).redirect('/familia/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' +error.message);
    }
}

//GET vista de editar Familia
exports.vistaEditarFamilia = async(req,res)=>{
    try {
        const id = req.params.id;
        //busco la categoria para pasarsela a la vista
        const familia = await Familia.findByPk(id);
        if(!familia){
            return res.status(404).json('No existe familia!');
        }
        return res.status(200).render('familia/editar',{familia});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH editar Familia
exports.editarFamilia = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        //busco que no exista duplicado de nombre
        const familia = await Familia.findOne({where:{nombre:data.nombre}});
        if(familia){
            return res.status(409).render('familia/editar',{familia, errorMessage:'Ya existe una familia con este nombre!'});
        }
        await Familia.update({nombre:data.nombre},{where:{idFamilia:id}});
        req.session.message = 'Familia Actualizada con exito!';
        return res.status(200).redirect('/familia/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH descativar Familia
exports.desactivarFamilia = async(req,res)=>{
    try {
        const id = req.params.id;
        const familia = await Familia.findByPk(id);
        await Familia.update({estado:false},{where:{idFamilia:id}});
        req.session.message = `Familia: ${familia.nombre} Descativada con exito!`;
        return res.status(200).redirect('/familia/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH reativar Familia
exports.activarFamilia = async(req,res)=>{
    try {
        const id = req.params.id;
        const familia = await Familia.findByPk(id);
        await Familia.update({estado:true},{where:{idFamilia:id}});
        req.session.message = `Familia: ${familia.nombre} Activada con exito!`;
        return res.status(200).redirect('/familia/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}