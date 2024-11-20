const Profesion = require('../models/profesion');

exports.getForm = async(req,res)=>{
    try {
        res.status(200).render('profesion/indexProfesion');
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
            return res.status(400).json('Ya existe una profesion con ese nombre!');
        }
        await Profesion.create(data);
        res.status(200).json('Profesion creada con exito!');
    } catch (error) {
        return res.status(500).json('Error al crear profesion' + error);
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
        res.status(200).json('Profesion dada de baja!');
    } catch (error) {
        return res.status(500).json('Error al dar de baja la profesion'+error);
    }
}