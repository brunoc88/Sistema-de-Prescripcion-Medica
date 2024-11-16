const express = require('express');
const especialidadController = require('../controllers/especialidadController');
const especialidadRouter = express.Router();

especialidadRouter.post('/alta',especialidadController.altaEspecialidad)

especialidadRouter.patch('/baja/:idEspecialidad',especialidadController.bajaEspecialidad)

module.exports = especialidadRouter;