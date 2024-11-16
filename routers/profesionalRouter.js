const express = require('express');
const profesionalController = require('../controllers/profesionalController');
const profesionalRouter = express.Router();

profesionalRouter.post('/alta',profesionalController.altaProfesional);

profesionalRouter.patch('/baja/:idProfesional',profesionalController.bajarProfesional);

module.exports = profesionalRouter;