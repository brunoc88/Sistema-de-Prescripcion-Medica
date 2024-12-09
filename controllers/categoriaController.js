const Categoria = require('../models/categoria');

//GET de vista index Categoria y a la vez la vista de altas
exports.vistaIndexCategoria = async(req,res)=>{
    try {
        //listo las categorias
        const categorias = await Categoria.findAll();

        if(!categorias){
            return res.status(404).json('No se encontraton categorias!');
        }
        return res.status(200).render('categoria/index',{categorias});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

//POST de Categoria
exports.altaCategoria = async(req,res)=>{
    try {
        const data = req.body;
        
        //busco que no hay duplicado
        const categoria = await Categoria.findOne({where:{nombre:data.nombre}})
        if(categoria){
            req.session.errorMessage = 'Ya existe una categoria con ese nombre!';
            return res.status(409).redirect('/categoria/index');
        }
        await Categoria.create(data);
        req.session.message = `Categoria ${data.nombre} creada con exito!`;
        return res.status(200).redirect('/categoria/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' +error.message);
    }
}

//GET vista de editar Categoria
exports.vistaEditarCategoria = async(req,res)=>{
    try {
        const id = req.params.id;
        //busco la categoria para pasarsela a la vista
        const categoria = await Categoria.findByPk(id);
        if(!categoria){
            return res.status(404).json('No existe categoria!');
        }
        return res.status(200).render('categoria/editar',{categoria});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH editar Categoria
exports.editarCategoria = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        //busco que no exista duplicado de nombre
        const categoria = await Categoria.findOne({where:{nombre:data.nombre}});
        if(categoria){
            return res.status(409).render('categoria/editar',{categoria, errorMessage:'Ya existe una categoria con este nombre!'});
        }
        await Categoria.update({nombre:data.nombre},{where:{idCategoria:id}});
        req.session.message = 'Categoria Actualizada con exito!';
        return res.status(200).redirect('/categoria/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH descativar Categoria
exports.desactivarCategoria = async(req,res)=>{
    try {
        const id = req.params.id;
        const categoria = await Categoria.findByPk(id);
        await Categoria.update({estado:false},{where:{idCategoria:id}});
        req.session.message = `Categoria: ${categoria.nombre} Descativada con exito!`;
        return res.status(200).redirect('/categoria/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH reativar Categoria
exports.activarCategoria = async(req,res)=>{
    try {
        const id = req.params.id;
        const categoria = await Categoria.findByPk(id);
        await Categoria.update({estado:true},{where:{idCategoria:id}});
        req.session.message = `Categoria: ${categoria.nombre} Activada con exito!`;
        return res.status(200).redirect('/categoria/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}