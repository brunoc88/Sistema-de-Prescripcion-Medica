const express = require('express');
const planController = require('../controllers/planController');
const routerPlan = express.Router();

//index de plan
routerPlan.get('/index',planController.getForm);

//cargar vista form editar con los datos de plan a actualizar
routerPlan.get('/editar/:idPlan',planController.getFormEditar)

//actualizar plan
routerPlan.put('/editarEnviar/:idPlan',planController.actualizarPlan)

//crear nuevo plan
routerPlan.post('/alta',planController.altaPlan);
//bajar plan
routerPlan.patch('/baja/:idPlan',planController.bajarPlan);

//reactivar un plan
routerPlan.patch('/activar/:id',planController.activarPlan);



module.exports = routerPlan;