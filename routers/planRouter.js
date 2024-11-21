const express = require('express');
const planController = require('../controllers/planController');
const routerPlan = express.Router();

routerPlan.get('/index',planController.getForm);

routerPlan.get('/editar/:idPlan',planController.getFormEditar)

routerPlan.post('/alta',planController.altaPlan);

routerPlan.patch('/baja/:idPlan',planController.bajarPlan);

module.exports = routerPlan;