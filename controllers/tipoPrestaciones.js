const TipoPrestacion = require('../models/tipoPrestaciones');

//GET vista index y alta de Prestacion
exports.vistaIndexPrestacion = async(req,res)=>{
    try {
        //listo los tipos de prestaciones
        const tipoPrestaciones = await TipoPrestacion.findAll();
        res.status(200).render('tipoPrestaciones/index',{tipoPrestaciones});
    } catch (error) {
        res.status(500).json('Hubo un error: ' + error);
    }
}

//POST tipo Prestaciones
exports.altaPrestacion = async(req,res)=>{
    try {
        const data = req.body;

        //busco que no exista duplicado
        const tipo = await TipoPrestacion.findOne({where:{nombre:data.nombre}})
        if(tipo){
            req.session.errorMessage = 'Ya existe una prestacion con ese nombre!';
            return res.status(409).redirect('/tipoPrestaciones/index');
        }

        await TipoPrestacion.create(data);
        req.session.message = `Prestacion: ${data.nombre} creada con exito!`;
        return res.status(200).redirect('/tipoPrestaciones/index');
    } catch (error) {
        res.status(500).json('Hubo un error: ' + error);
    }
}