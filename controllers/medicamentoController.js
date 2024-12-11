const Medicamento = require('../models/medicamento');
const Forma = require('../models/forma');
const Familia = require('../models/familia');
const Categoria = require('../models/categoria');


//Get infoMedicamento
exports.getInfo = async(req,res)=>{
    try {
        const medicamentos = await Medicamento.findAll({
            include:[{
                model: Forma
            },{
                model: Familia
            },{
                model: Categoria
            }]
        })
        res.json(medicamentos);
    } catch (error) {
        return res.json('Hubo un error: ' +error);
    }
}

//GET vista Alta Medicamento
exports.vistaAltaMedicamento = async(req,res)=>{
    try {
        //listo las formas, familias y categorias activas
        const formas = await Forma.findAll({where:{estado:true}});
        const familias = await Familia.findAll({where:{estado:true}});
        const categorias = await Categoria.findAll({where:{estado:true}});
        
        return res.status(200).render('medicamento/alta',{formas,familias,categorias})

    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}
//POST alta Medicamento
exports.altaMedicamento = async(req,res)=>{
    try {
        const data = req.body;
        await Medicamento.create(data);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}