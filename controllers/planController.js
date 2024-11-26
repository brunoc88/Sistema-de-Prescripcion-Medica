const Plan = require('../models/plan');
const Obrasocial = require('../models/obraSocial');
const { where } = require('sequelize');


//form de alta
exports.getForm = async(req,res)=>{
    try {
        const obraSociales = await Obrasocial.findAll({
            where: {estado:true}
        });//le paso las obras sociales activas a vista
        
        //obtengo los datos de los planes que esten activos y tambien uso join para asociarlo a la
        //obra social, asi obtengo el nombre de la obra social
        //tanto la obra social como el plan tienen que estar activos
        const planes = await Plan.findAll({
            attributes: ['nombre', 'estado', 'idPlan'],
            include: {
                model: Obrasocial,
                attributes: ['nombre', 'estado'] // Incluye 'estado' explícitamente aquí
            }
        });
        
        if(!obraSociales){
            return res.status(400).json('No hay obras sociales cargadas');
        }
        if(!planes){
            return res.status(400).json('No hay planes!');
        }
        res.render('plan/index', { obraSociales,planes});
        //res.status(200).json(planesActivos);
    } catch (error) {
        return res.status(500).json('Error'+ error);
    }
   
}
//vista form editar
exports.getFormEditar = async (req,res) => {
    try {
        const id = req.params.idPlan;
        const obraS = await Obrasocial.findAll({where:{estado:true}})
        const buscarPlan = await Plan.findOne({where:
            {idPlan:id},
            include:{
                model: Obrasocial,
                attributes:['nombre']
            }
        })
        if(!buscarPlan){
            return res.status(404).json('no existe el plan');
        }
        return res.status(200).render('plan/editarPlan',{
            plan:buscarPlan, obraSociales:obraS});
       // res.json(buscarPlan);
    } catch (error) {
        return res.status(500).json('Error al cargar formulario '+error);
    }
}

//crear nuevo plan
exports.altaPlan = async (req, res) => {
    try {
        const data = req.body;
        if (!data.nombre) {
            return res.status(400).send('Campo vacío!');
        }

        const buscarPlan = await Plan.findOne({ where: { nombre: data.nombre}});
        if (buscarPlan) {
            req.session.errorMessage = 'Nombre de plan ya registrado!';
            return res.status(400).redirect('/plan/index');
        }

        const nuevoPlan = await Plan.create(data);
        req.session.message = `Plan: ${data.nombre} creado con exito!`;
        return res.status(200).redirect('/plan/index');
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
        //res.status(200).json({ message: 'Plan eliminado lógicamente', buscarPlan });
        req.session.message = `Plan: ${buscarPlan.nombre} eliminado lógicamente`;
        return res.status(200).redirect('/plan/index');
    }catch(error){
        console.error('Error al borrar el plan:', error);
        res.status(500).json({ message: 'Error al borrar el plan', error });
    }
}

//reactivar un plan
exports.activarPlan = async (req, res) => {
    try {
        const id = req.params.id;

        // Busco el plan si existe o no
        const buscarPlan = await Plan.findByPk(id);
        if (!buscarPlan) {
            return res.status(404).json({ message: '¡No se encontró el plan!' });
        }

        // Verifico la existencia y estado de la obra social asociada
        const buscarObra = await Obrasocial.findOne({ where: { id: buscarPlan.idObra } });
        if (!buscarObra || !buscarObra.estado) {
            req.session.errorMessage = 
                `No se puede reactivar el plan: ${buscarPlan.nombre} porque la obra social ${buscarObra ? buscarObra.nombre : '(no encontrada)'} también está desactivada.`;
            return res.status(400).redirect('/plan/index');
        }

        // Reactivo el plan
        await Plan.update({ estado: true }, { where: { idPlan:id } });
        req.session.message = `¡Plan: ${buscarPlan.nombre} reactivado exitosamente!`;
        return res.status(200).redirect('/plan/index');

    } catch (error) {
        console.error('Error al activar el plan:', error);
        return res.status(500).json({ message: 'Se produjo un error: ' + error.message });
    }
};

