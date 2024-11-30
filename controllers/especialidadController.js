const { where } = require('sequelize');
const Especialidad = require('../models/especialidad');


//GET index 
exports.indexEspecialidad = async(req,res)=>{
    try {
        //listo las especialidades creadas
        const buscarEspecialidad = await Especialidad.findAll();

        if(!buscarEspecialidad){
            return res.status(404).json('No se encontraron Especialidades');
        }
        //return res.status(200).json(buscarEspecialidad);
        return res.status(200).render('especialidades/index',{Especialidades:buscarEspecialidad});
    } catch (error) {
        return res.status(500).json('Hubo un error: '+ error);
    }
}
//POST especialidad
exports.altaEspecialidad = async (req,res)=>{
    try {
        const data = req.body;
        if(!data.nombre){
            return res.status(400).send('Campo vacio!');
        }
        const buscarEspecialidad = await Especialidad.findOne({where:{nombre: data.nombre}})
        if(buscarEspecialidad){
            //return res.status(400).send('Ya existe esa especialidad');
            req.session.errorMessage = 'Ya existe esa especialidad';
            return res.status(409).redirect('/especialidades/index');
        }
        await Especialidad.create(data);
        //return res.status(200).send('Especialidad creada!');
        req.session.message = `Especialidad: ${data.nombre} Agregada con exito!`;
        return res.status(200).redirect('/especialidades/index');
    } catch (error) {
        res.status(500).send('Error al crear Especialidad' + error);
    }
}
//GET vista Formulario editar Especialidad
exports.editarEspecialidad = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;

        const buscarEspecialidad = await Especialidad.findByPk(id);

        if(!buscarEspecialidad){
            return res.status(404).json('No se encontro especialidad');
        }
        //cargo la vista con los datos de la especialidad
        return res.status(200).render('especialidades/editar',{e:buscarEspecialidad})
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message);
    }
}
//PATCH Actualizar Especialidad
exports.actualizarEspecialidad = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        const buscarEspecialidad = await Especialidad.findOne({where:{nombre:data.nombre}});

        if(buscarEspecialidad){
            return res.status(409).render('especialidades/editar',{e:buscarEspecialidad, errorMessage:'Ya existe una especialdiad con ese nombre!'});
        }
        await Especialidad.update(data,{where:{idEspecialidad:id}});
        req.session.message = `Especialidad: ${data.nombre} Actualizada con exito!`;
        return res.status(200).redirect('/especialidades/index')
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error.message);
    }
}
//PATCH bajar Especialidad
exports.bajaEspecialidad = async(req,res)=>{
    try {
        const id = req.params.idEspecialidad;
        const buscarEspecialidad = await Especialidad.findOne({where:{idEspecialidad:id}})
        if(!buscarEspecialidad){
            return res.status(400).json('no existe especialidad!');
        }
        await Especialidad.update({estado: false}, {where: {idEspecialidad: id}});
        //res.status(200).json('Especialidad Eliminada!');
        req.session.message = `Especialidad: ${buscarEspecialidad.nombre} Eliminada!`;
        return res.status(200).redirect('/especialidades/index');
    } catch (error) {
        return res.status(500).json('Error al eliminar Especialidad' + error);
    }
}
//PATCH reactivar Especialidad
exports.reactivarEspecialidad = async(req,res)=>{
    try {
        const id = req.params.id;
        const buscarEspecialidad = await Especialidad.findByPk(id);

        if(!buscarEspecialidad){
            return res.status(404).json('No existe Especialidad');
        }

        await Especialidad.update({estado:true},{where:{idEspecialidad:id}});
        req.session.message = `Especialidad : ${buscarEspecialidad.nombre} Actualizada con exito!`;
        return res.status(200).redirect('/especialidades/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: '+ error.message);
    }
}

