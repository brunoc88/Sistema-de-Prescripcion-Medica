const express = require('express');
const planController = require('../controllers/planController');
const routerPlan = express.Router();

routerPlan.get('/alta',planController.getForm);

routerPlan.post('/alta',planController.altaPlan);

routerPlan.patch('/baja/:idPlan',planController.bajarPlan);

module.exports = routerPlan;