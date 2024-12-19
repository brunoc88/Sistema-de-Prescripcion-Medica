const express = require('express');
const profesionalController = require('../controllers/profesionalController');
const profesionalRouter = express.Router();

//GET vista index Profesinal
profesionalRouter.get('/index',profesionalController.indexProfesional);
//GET vista alta Profesional
profesionalRouter.get('/crear',profesionalController.vistaAltaProfesional);
//POST alta de profesional
profesionalRouter.post('/alta',profesionalController.altaProfesional);
//GET vista editar Profesional
profesionalRouter.get('/editar/:id',profesionalController.vistaEditarProfesional);
//PUT actualizar Profesional
profesionalRouter.put('/actualizar/:id',profesionalController.actualizarProfesional);
//PATCH activar Profesional(Solamente por contrato!)
profesionalRouter.patch('/activar/:id',profesionalController.reactivarUnProfesional);
//PATCH desactivar Profesional(solamente bajando contrato!)
profesionalRouter.patch('/desactivar/:id',profesionalController.bajaProfesional)

module.exports = profesionalRouter;