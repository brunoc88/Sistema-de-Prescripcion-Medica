const { where } = require('sequelize');
const Especialidad = require('../models/especialidad');

exports.altaEspecialidad = async (req,res)=>{
    try {
        const data = req.body;
        if(!data.nombre){
            return res.status(400).send('Campo vacio!');
        }
        const buscarEspecialidad = await Especialidad.findOne({where:{nombre: data.nombre}})
        if(buscarEspecialidad){
            return res.status(400).send('Ya existe esa especialidad');
        }
        await Especialidad.create(data);
        return res.status(200).send('Especialidad creada!');
    } catch (error) {
        res.status(500).send('Error al crear Especialidad' + error);
    }
}

exports.bajaEspecialidad = async(req,res)=>{
    try {
        const id = req.params.idEspecialidad;
        const buscarEspecialidad = await Especialidad.findOne({where:{idEspecialidad:id}})
        if(!buscarEspecialidad){
            return res.status(400).json('no existe especialidad!');
        }
        await Especialidad.update({estado: false}, {where: {idEspecialidad: id}});
        res.status(200).json('Especialidad Eliminada!');
    } catch (error) {
        return res.status(500).json('Error al eliminar Especialidad' + error);
    }
}