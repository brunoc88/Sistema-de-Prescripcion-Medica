const express = require('express');
const planController = require('../controllers/planController');
const routerPlan = express.Router();

routerPlan.get('/index',planController.getForm);

//cargar vista con los datos de plan a actualizar
routerPlan.get('/editar/:idPlan',planController.getFormEditar)

//crear nuevo plan
routerPlan.post('/alta',planController.altaPlan);

routerPlan.patch('/baja/:idPlan',planController.bajarPlan);

//reactivar un plan
routerPlan.patch('/activar/:id',planController.activarPlan);

module.exports = routerPlan;