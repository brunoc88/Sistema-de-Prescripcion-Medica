const Plan = require('../models/plan');
const Obrasocial = require('../models/obraSocial');
const { where, Op } = require('sequelize');


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
        const buscarPlan = await Plan.findOne({where:
            {idPlan:id},
            include:{
                model: Obrasocial,
                attributes:['nombre','id','estado']
            }
        })
        if(!buscarPlan){
            return res.status(404).json('no existe el plan');
        }
        if(!buscarPlan.ObraSocial.estado){
            req.session.errorMessage = `Error: No se puedo actualizar plan: ${buscarPlan.nombre}, Obra social ${buscarPlan.ObraSocial.nombre} inexistente o desactivada!`;
            return res.redirect('/plan/index');
        }
        return res.status(200).render('plan/editarPlan',{
            plan:buscarPlan});
       // res.json(buscarPlan);
    } catch (error) {
        return res.status(500).json('Error al cargar formulario '+error);
    }
}

exports.actualizarPlan = async(req, res) => {
    try {
        const data = req.body;
        const id = req.params.idPlan;

        // Consulta que no exista un plan con el mismo nombre en la misma obra social
        const buscarPlan = await Plan.findOne({
            where: {
                nombre: data.nombre, // Nombre del plan
                idObra: data.idObra  // ID de la obra social
            },
            include: {
                model: Obrasocial,
                attributes: ['nombre']
            }
        });
         // Obtener todas las obras sociales activas por si falla
         const obraSociales = await Obrasocial.findAll({ where: { estado: true } });

         // Si ya existe un plan con el mismo nombre en la obra social
         if (buscarPlan) {
             return res.status(409).render('plan/editarPlan', {
                 plan: buscarPlan,  // Pasar los datos del plan
                 obraSociales,  // Pasar las obras sociales activas
                 errorMessage: `Ya existe un plan: ${data.nombre} en la obra social: ${buscarPlan.ObraSocial.nombre}!`
             });
         }

        // Actualizar el plan si no hay conflictos
        await Plan.update({ nombre: data.nombre }, { where: { idPlan: id } });

        req.session.message = `Plan: ${data.nombre} actualizado con éxito!`;
        return res.status(200).redirect('/plan/index');
    } catch (error) {
        console.error(error);  // Imprimir error para depuración
        return res.status(500).json('Hubo un error: ' + error.message);
    }
};


//crear nuevo plan
exports.altaPlan = async (req, res) => {
    try {
        const data = req.body;
        if (!data.nombre) {
            return res.status(400).send('Campo vacío!');
        }
        //busco si hay una plan relacinado a un obra social para evitar que exista una obra social
        //que tenga dos planes con el mismo nombre
        const buscarPlan = await Plan.findOne({ where: { nombre: data.nombre,idObra:data.idObra}});
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
        //si mi obra social es null o que si existe y esta descativada
        //si se cumple lo del if no voy a poder reactivar mi plan
        //ya que el plan depende de la existencia de la obra
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


//obtener plan por obra social
exports.obtenerPlanesPorObra = async(req,res)=>{
    try {
        const id = req.params.id;
        const planes = await Plan.findAll({where:{idObra:id}});

        if(!planes || planes.length === 0){
            return res.status(404).json('No se encontraron planes relacionados a obras sociales')
        }
        return res.status(200).json(planes);

    } catch (error) {
        return res.status(500).json('Hubo un error' + error.message);
    }
}
