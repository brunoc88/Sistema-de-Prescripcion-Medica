const Profesion = require('../models/profesion');

exports.indexProfesion = async(req,res)=>{
    try {
        const profesiones = await Profesion.findAll();
        
        if(!profesiones){
            return res.status(404).json('No hay profesiones registradas!');
        }
        
        return res.status(200).render('profesion/index',{profesiones});
    } catch (error) {
        return res.status(500).json('Error al solicitar pagina: '+error);
    }
}

exports.altaProfesion = async (req,res)=>{
    try {
        const data = req.body;
        if(!data){
            return res.status(400).json('Campo vacio!');
        }
        const buscarProfesion = await Profesion.findOne({where:{nombre:data.nombre}});
        if(buscarProfesion){
            req.session.errorMessage = 'Ya existe una profesion con ese nombre!';
            return res.status(409).redirect('/profesion/index');
            //return res.status(409).json('Ya existe una profesion con ese nombre!');
        }
        await Profesion.create(data);
        //res.status(200).json('Profesion creada con exito!');
        req.session.message = `Profesion: ${data.nombre} Creada con exito!`;
        return res.status(200).redirect('/profesion/index');
    } catch (error) {
        return res.status(500).json('Error al crear profesion' + error);
    }
}

exports.editarProfesion = async(req,res)=>{
    try {
        const id = req.params.id;
        const buscarProfesion = await Profesion.findByPk(id);

        if(!buscarProfesion){
            return res.status(404).json('No existe profesion!');
        }
        return res.status(200).render('profesion/editar',{profesion: buscarProfesion});

    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message);
    }
}

exports.actualizarProfesion = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;

        const buscarProfesion = await Profesion.findOne({where:{nombre:data.nombre}});
        if(buscarProfesion){
            return res.status(409).render('profesion/editar',{
                profesion:buscarProfesion,
                errorMessage:'Ya existe una profesion con ese nombre!'});
        }
        await Profesion.update(data, { where: { idProfesion: id } });
        req.session.message = `Profesion: ${data.nombre} actualizada con exito!`;
        return res.status(200).redirect('/profesion/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message);
    }
}

exports.bajaProfesion = async (req,res)=>{
    try {
        const id = req.params.idProfesion;
        const buscarProfesion = await Profesion.findByPk(id)
        if(!buscarProfesion){
            return res.status(400).json('No exsiste profesion!');
        }
        await Profesion.update({estado:false},{where:{idProfesion:id}})
        req.session.message = `Profesion: ${buscarProfesion.nombre} desactivada!`;
        //res.status(200).json('Profesion dada de baja!');
        return res.status(200).redirect('/profesion/index');
    } catch (error) {
        return res.status(500).json('Error al dar de baja la profesion'+error);
    }
}

exports.reactivarProfesion = async (req,res)=>{
    try {
        const id = req.params.id;
        const buscarProfesion = await Profesion.findByPk(id);

        if(!buscarProfesion){
            return res.status(400).json('No existe profesion');
        }

        await Profesion.update({estado:true},{where:{idProfesion:id}})
        req.session.message = `Profesion: ${buscarProfesion.nombre} Reactivada!`;
        return res.status(200).redirect('/profesion/index');
    } catch (error) {
        return res.status(500).json('Hubo un error '+error.message);
    }
}