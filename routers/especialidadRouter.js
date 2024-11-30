const express = require('express');
const especialidadController = require('../controllers/especialidadController');
const especialidadRouter = express.Router();

//GET index
especialidadRouter.get('/index',especialidadController.indexEspecialidad);
//POST alta de Especialidad
especialidadRouter.post('/alta',especialidadController.altaEspecialidad);
//GET vista Editar Especialidad
especialidadRouter.get('/editar/:id',especialidadController.editarEspecialidad);
//PATCH actuzalizar Especialidad
especialidadRouter.patch('/actualizar/:id',especialidadController.actualizarEspecialidad);
//PATCH descativar Especialidad
especialidadRouter.patch('/baja/:idEspecialidad',especialidadController.bajaEspecialidad);
//PATCH reactivar Especialidad
especialidadRouter.patch('/activar/:id',especialidadController.reactivarEspecialidad);

module.exports = especialidadRouter;