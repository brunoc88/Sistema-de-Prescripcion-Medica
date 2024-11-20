const Plan = require('../models/plan');
const Obrasocial = require('../models/obraSocial');


exports.getForm = async(req,res)=>{
    try {
        const obraSociales = await Obrasocial.findAll({
            where: {estado:true}
        });//le paso las obras sociales activas a vista
        
        //obtengo los datos de los planes que esten activos y tambien uso join para asociarlo a la
        //obra social, asi obtengo el nombre de la obra social
        //tanto la obra social como el plan tienen que estar activos
        const planesActivos = await Plan.findAll({
            attributes:['nombre','estado','idPlan'],
            where:{
                estado:true
            },
            include:{
                model: Obrasocial,
                attributes:['nombre'],
                where:{
                    estado:true
                }
            }
            
        })
        if(!obraSociales){
            return res.status(400).json('No hay obras sociales cargadas');
        }
        if(!planesActivos){
            return res.status(400).json('No hay planes!');
        }
        res.render('plan/indexPlan', { obraSociales,planesActivos});
        //res.status(200).json(planesActivos);
    } catch (error) {
        return res.status(500).json('Error'+ error);
    }
   
}

exports.altaPlan = async (req, res) => {
    try {
        const data = req.body;
        if (!data.nombre) {
            return res.status(400).send('Campo vacío!');
        }

        const buscarPlan = await Plan.findOne({ where: { nombre: data.nombre,idObra: data.idObra }});
        if (buscarPlan) {
            return res.status(400).json({ message: 'Nombre de plan ya registrado!' });
        }

        const nuevoPlan = await Plan.create(data);
        
        res.redirect('/plan/alta');
    } catch (error) {
        console.error('Error al crear plan:', error);
        res.status(500).json({ message: 'Error al crear plan', error });
    }
};

exports.bajarPlan = async (req,res) =>{
    try{
        const {idPlan} = req.params;
        const buscarPlan = await Plan.findByPk(idPlan)
        if(!buscarPlan){
            return res.status(400).send('No existe tal plan!');
        }
        await Plan.update({ estado: false }, { where: { idPlan } });
        res.status(200).json({ message: 'Plan eliminado lógicamente', buscarPlan });
    }catch(error){
        console.error('Error al borrar el plan:', error);
        res.status(500).json({ message: 'Error al borrar el plan', error });
    }
}

