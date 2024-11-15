const Plan = require('../models/plan');

exports.altaPlan = async (req, res) => {
    try {
        const data = req.body;
        if (!data.nombre) {
            return res.status(400).send('Campo vacío!');
        }

        const buscarPlan = await Plan.findOne({ where: { nombre: data.nombre } });
        if (buscarPlan) {
            return res.status(400).json({ message: 'Nombre de plan ya registrado!' });
        }

        const nuevoPlan = await Plan.create(data);
        res.status(200).json({ message: 'Plan creado con éxito!' });
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

