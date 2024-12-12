const Prestacion = require('../models/prestacion');

//GET vista Alta Prestacion
exports.vistaAltaPrestacion = async(req,res)=>{
    try {
        res.status(200).render('prestaciones/alta');
    } catch (error) {
        res.status(500).json('Hubo un error: ' + error);
    }
}
//POST alta Prestacion 
exports.altaPrestacion = async(req,res)=>{
    try {
        const data = req.body;

        if(data.lado == ''){
            data.lado = 'No especificado';
        }

        await Prestacion.create(data);
        req.session.message = `Prestacion ${data.nombre}`
    } catch (error) {
        res.status(500).json('Hubo un error: ' + error);
    }
}