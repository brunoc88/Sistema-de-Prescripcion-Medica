const express = require('express');
const profesionalController = require('../controllers/profesionalController');
const profesionalRouter = express.Router();

profesionalRouter.get('/alta',profesionalController.getForm);

profesionalRouter.post('/alta',profesionalController.altaProfesional);

profesionalRouter.patch('/baja/:idProfesional',profesionalController.bajarProfesional);

module.exports = profesionalRouter;