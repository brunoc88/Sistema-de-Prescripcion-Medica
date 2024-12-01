const REFEPS = require('./refeps');

//GET de informacion de profesional
exports.obtenerRefeps = async (req,res)=>{
    try {
        const id = req.params.id;
        const buscarRefeps = await REFEPS.findOne({
            where:{idRefeps:id}
        })
        if(!buscarRefeps){
            return res.status(404).json('No se encontro profesional en el sistema!');
        }
        return res.status(200).json({profesional:buscarRefeps});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' +error);
    }
}